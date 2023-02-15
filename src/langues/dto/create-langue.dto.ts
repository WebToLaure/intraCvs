import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLangueDto {

    @ApiProperty()
    @IsString()
    langue: string;


    @ApiProperty()
    @IsString()
    niveau: string;
}
