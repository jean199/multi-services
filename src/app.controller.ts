import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { MultiServiceResponseDto } from './dtos/multi.service.dto';
import { ServiceDto } from './dtos/service.dto';

@Controller('/multiservice')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  @ApiBody({ type: ServiceDto })
  @ApiResponse({ status: 201, description: 'The request has been successfully executed.', type: MultiServiceResponseDto })
  @ApiResponse({ status: 500, description: 'Internal Service Error.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getDataFromService(@Body() serviceDto: ServiceDto): Promise<MultiServiceResponseDto> {
    return this.appService.getDatafromServices(serviceDto);
  }
}
