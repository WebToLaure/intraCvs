import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateTechniqueDto {

    @ApiProperty()
    @IsString()
    libelle: string;



}
