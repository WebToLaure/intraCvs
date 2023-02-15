import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsNumber } from "class-validator";


export class CreateExperienceDto {

    @ApiProperty()
    @IsString()
    intitulé_poste: string;


    @ApiProperty()
    @IsString()
    entreprise: string;

    @ApiProperty()
    @IsString()
    lieu: string;


    @ApiProperty()
    @IsString()
    date_début: Date;

    @ApiProperty()
    @IsNumber()
    date_fin: Date;


    @ApiProperty()
    @IsNumber()
    descriptif: string


}
