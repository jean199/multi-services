import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ServiceDto } from './service.dto';

export class ListServicesDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ServiceDto)
    services: ServiceDto[] = [
        {
            source: 'google.com',
            services: ['geoip', 'ping', 'reversedns', 'rdap']
        }
    ]

}