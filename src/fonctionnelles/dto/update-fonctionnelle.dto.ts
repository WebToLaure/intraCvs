import { PartialType } from '@nestjs/swagger';
import { CreateFonctionnelleDto } from './create-fonctionnelle.dto';

export class UpdateFonctionnelleDto extends PartialType(CreateFonctionnelleDto) {}
