
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePresentationDto {

    @ApiProperty()
    @IsString()
    A_propos: string;

}
