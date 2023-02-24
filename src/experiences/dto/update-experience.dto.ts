import { PartialType } from '@nestjs/swagger';
import { UpdateDateColumn } from 'typeorm';
import { CreateExperienceDto } from './create-experience.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsNumber } from "class-validator";

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {


    @ApiProperty()
    @IsString()
    date_début: Date;

    @ApiProperty()
    @IsString()
    date_fin: Date;



}
