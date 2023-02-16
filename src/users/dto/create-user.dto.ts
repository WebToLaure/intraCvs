import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsNumber } from "class-validator";


export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
    @ApiProperty()
    @IsString()
    poste_actuel: string;

    @ApiProperty()
    @IsString()
    classe_professionnelle: string;

    @ApiProperty()
    @IsString()
    ville_affectation: string;

    @ApiProperty()
    @IsString()
    region_affectation: string;



}