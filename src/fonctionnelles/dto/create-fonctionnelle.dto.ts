import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";



export class CreateFonctionnelleDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    libelle: string;

}
