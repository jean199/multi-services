import { Injectable } from '@nestjs/common';
import { MultiServiceResponseDto } from './dtos/multi.service.dto';
import { ServiceDto } from './dtos/service.dto';

const { Worker } = require('worker_threads');
const dns = require('dns');

@Injectable()
export class AppService {

    async getDatafromServices(serviceDto: ServiceDto): Promise<MultiServiceResponseDto> {
        const promises = [];
        const ip = await this.getIpAddress(serviceDto.source);

        serviceDto.services.forEach((serviceType: string) => {
            promises.push(new Promise((resolve, reject) => {
                serviceType = serviceType.toLowerCase();
                const worker = new Worker(`./src/workers/${serviceType}.worker.js`, {
                    workerData: {
                        ipOrDomains: ip
                    }
                });
                worker.on('message', result => {
                    resolve(result)
                });
                worker.on('error', error => {
                    reject(error)
                });
            }));

        });
        let response: MultiServiceResponseDto = {};
        (await Promise.all(promises)).map((result) => {
            response = {
                ...response,
                ...result
            }
        });
        return response;
    }


    async getIpAddress(domain: string) {
        const ipPromise = new Promise((resolve, reject) => {
            dns.lookup(domain, (err, address) => {
                if (err) reject(err);
                resolve(address);
            })
        });
        return await ipPromise;
    }
}
