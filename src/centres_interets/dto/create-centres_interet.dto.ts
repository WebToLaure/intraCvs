import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCentresInteretDto {


    @ApiProperty()
    @IsString()
    intitulé: string;

}
