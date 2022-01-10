import { ApiProperty } from "@nestjs/swagger";

export class pingDto {
    @ApiProperty({ type: String })
    inputHost: string;

    @ApiProperty({ type: String })
    host: string;

    @ApiProperty({ type: String })
    alive: string;

    @ApiProperty({ type: String })
    output: string;

    @ApiProperty({ type: String })
    time: string;

    @ApiProperty({ type: [String] })
    times: string[];

    @ApiProperty({ type: String })
    min: string;

    @ApiProperty({ type: String })
    max: string;

    @ApiProperty({ type: String })
    avg: string;

    @ApiProperty({ type: String })
    packetLoss: string;

    @ApiProperty({ type: String })
    numeric_host: string;
}