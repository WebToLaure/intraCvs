import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCompetenceDto {

   
    @ApiProperty()
    @IsString()
    competence_clé: string;





}
