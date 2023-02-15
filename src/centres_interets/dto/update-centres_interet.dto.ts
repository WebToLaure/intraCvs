import { PartialType } from '@nestjs/swagger';
import { CreateCentresInteretDto } from './create-centres_interet.dto';

export class UpdateCentresInteretDto extends PartialType(CreateCentresInteretDto) {}
