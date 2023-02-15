import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateFormationDto {

    @ApiProperty()
    @IsString()
    formation: string;

    @ApiProperty()
    @IsString()
    diplôme: string;

    @ApiProperty()
    @IsString()
    date_obtention: Date;

}
