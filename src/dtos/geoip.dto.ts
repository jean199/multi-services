import { ApiProperty } from "@nestjs/swagger";

export class geoIpDto {

    @ApiProperty({ type: [Number] })
    range: Number[];

    @ApiProperty({ type: String })
    country: string;

    @ApiProperty({ type: String })
    region: string;

    @ApiProperty({ type: String })
    eu:string;

    @ApiProperty({ type: String })
    timezone: string;

    @ApiProperty({ type: String })
    city: string;

    @ApiProperty({ type: [String] })
    ll: string[];

    @ApiProperty({ type: Number })
    metro: Number;

    @ApiProperty({ type: Number })
    area: Number;
}