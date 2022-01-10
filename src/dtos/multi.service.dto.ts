import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { geoIpDto } from './geoip.dto';
import { pingDto } from './ping.dto';
import { rdapDto } from './rdap.dto';

export class MultiServiceResponseDto {
  @ApiProperty({ type: String })
  source: string;

  @ApiProperty({ type: geoIpDto })
  geoip?: geoIpDto;

  @ApiProperty({ type: pingDto })
  ping?: pingDto;

  @IsArray()
  @Type(() => String)
  @ApiProperty({ type: [String] })
  reverseDns?: string[];

  @ApiProperty({ type: rdapDto })
  rdap?: rdapDto;
}
