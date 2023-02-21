import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail} from "class-validator";
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastname: string;
    
    @ApiProperty()
    @IsString()
    telephone: string;
    
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
