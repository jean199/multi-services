import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, Matches, Validate } from 'class-validator';
import { ValidType } from '../validators/service.validator';


export class ServiceDto {

    @IsString()
    @Matches(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/, {
        message:
            'ip or domain is not valid',
    })
    @ApiProperty({ type: String })
    source: string;

    @IsArray()
    @IsString({ each: true })
    @Validate(ValidType, {
        message: 'tasks are not valid'
    })
    @ApiProperty({ type: [String] })
    tasks: string[] ;
}