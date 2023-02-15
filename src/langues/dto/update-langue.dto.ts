import { PartialType } from '@nestjs/swagger';
import { CreateLangueDto } from './create-langue.dto';

export class UpdateLangueDto extends PartialType(CreateLangueDto) {}
