import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCompetenceDto {

    @ApiProperty()
    @IsString()
    technique: string;

    @ApiProperty()
    @IsString()
    fonctionnelle: string;

    @ApiProperty()
    @IsString()
    competences_clés: string;





}
