import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, Matches, Validate } from 'class-validator';
import { ValidType } from '../validators/service.validator';


export class ServiceDto {

    @IsString()
    @Matches(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/, {
        message:
            'the values is not an ip or domain',
    })
    @ApiProperty({ type: String })
    source: string = 'google.com';

    @IsArray()
    @IsString({ each: true })
    @Validate(ValidType, {
        message: 'one of the types is not valid'
    })
    @ApiProperty({ type: [String] })
    services: string[] = ['geoip', 'ping', 'reversedns'];
}