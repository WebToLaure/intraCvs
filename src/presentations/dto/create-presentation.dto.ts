
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreatePresentationDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string;

}
