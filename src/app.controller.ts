import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ListServicesDto } from './dtos/list.services.dto';
import { MultiServiceResponseDto } from './dtos/multi.service.dto';

@Controller('/multiservice')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  @ApiBody({ type: ListServicesDto })
  @ApiResponse(
    {
      status: 201,
      description: 'The request has been successfully executed.',
      type: MultiServiceResponseDto
    }
  )
  @ApiResponse({ status: 500, description: 'Internal Service Error.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getDataFromService(
    @Body() serviceDto: ListServicesDto
  ): Promise<MultiServiceResponseDto[]> {
    return this.appService.getIPsOrDomainsData(serviceDto, []);
  }
}
