import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ListServicesDto } from './dtos/list.services.dto';
import { MultiServiceResponseDto } from './dtos/multi.service.dto';
import { ServiceDto } from './dtos/service.dto';
import { Worker } from 'worker_threads';
import * as dns from 'dns';

@Injectable()
export class AppService {
  async getDatafromServices(
    serviceDto: ServiceDto,
  ): Promise<MultiServiceResponseDto> {
    const promises = [];
    const ip = await this.getIpAddress(serviceDto.source);

    serviceDto.tasks.forEach((task: string) => {
      promises.push(
        new Promise((resolve, reject) => {
          task = task.toLowerCase();
          this.createWorker(task, ip, resolve, reject);
        }),
      );
    });
    let response: MultiServiceResponseDto = {
      source: serviceDto.source,
    };
    (await Promise.all(promises)).map((result) => {
      response = {
        ...response,
        ...result,
      };
    });
    return response;
  }

  getIPsOrDomainsData(
    serviceDtoList: ListServicesDto,
    currentInfo: Promise<MultiServiceResponseDto>[],
  ): Promise<MultiServiceResponseDto[]> {
    currentInfo.push(
      this.getDatafromServices(
        serviceDtoList.services[serviceDtoList.services.length - 1],
      ),
    );
    if (serviceDtoList.services.length === 1) {
      return Promise.all(currentInfo).then((result) => {
        return result;
      });
    } else {
      serviceDtoList.services.pop();
      return this.getIPsOrDomainsData(serviceDtoList, currentInfo);
    }
  }

  async getIpAddress(domain: string) {
    const ipPromise = new Promise((resolve, reject) => {
      dns.lookup(domain, (err, address) => {
        if (err) {
          reject(err);
        }
        resolve(address);
      });
    }).catch((err) => {
      console.error(err);
      throw new HttpException(
        'ip or domain is not valid',
        HttpStatus.BAD_REQUEST,
      );
    });
    return await ipPromise;
  }

  createWorker(task, ip, resolve, reject): void {
    const worker = new Worker(`./src/workers/${task}.worker.js`, {
      workerData: {
        ipOrDomains: ip,
      },
    });
    worker.on('message', (result) => {
      resolve(result);
    });
    worker.on('error', (error) => {
      reject(error);
    });
  }
}
