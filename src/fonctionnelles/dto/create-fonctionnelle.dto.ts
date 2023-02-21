import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";



export class CreateFonctionnelleDto {

    @ApiProperty()
    @IsString()
    libelle: string;

}
