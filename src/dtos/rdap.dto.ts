import { ApiProperty } from "@nestjs/swagger";

export class rdapDto {
    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String })
    registrant: string;

    @ApiProperty({ type: String })
    asn: string;

    @ApiProperty({ type: String })
    registration: string;

    @ApiProperty({ type: String })
    cidr: string;
}