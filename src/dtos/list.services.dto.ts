import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ServiceDto } from './service.dto';

export class ListServicesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceDto)
  @ApiProperty({ type: [ServiceDto] })
  services: ServiceDto[] = [
    {
      source: 'google.com',
      tasks: ['geoip', 'ping', 'reversedns', 'rdap'],
    },
  ];
}
