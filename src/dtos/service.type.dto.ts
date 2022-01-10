import { IsString, Validate } from 'class-validator';
import { ValidType } from '../validators/service.validator';

export class ServiceTypeDto {


    @IsString()
    @Validate(ValidType, {
        message: 'type is not valid'
    })
    service: string;
}