import { Injectable } from '@nestjs/common';
import { CreateFonctionnelleDto } from './dto/create-fonctionnelle.dto';
import { UpdateFonctionnelleDto } from './dto/update-fonctionnelle.dto';

@Injectable()
export class FonctionnellesService {
  create(createFonctionnelleDto: CreateFonctionnelleDto) {
    return 'This action adds a new fonctionnelle';
  }

  findAll() {
    return `This action returns all fonctionnelles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fonctionnelle`;
  }

  update(id: number, updateFonctionnelleDto: UpdateFonctionnelleDto) {
    return `This action updates a #${id} fonctionnelle`;
  }

  remove(id: number) {
    return `This action removes a #${id} fonctionnelle`;
  }
}
