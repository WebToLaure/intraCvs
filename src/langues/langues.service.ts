import { Injectable } from '@nestjs/common';
import { CreateLangueDto } from './dto/create-langue.dto';
import { UpdateLangueDto } from './dto/update-langue.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LanguesService {
  create(createLangueDto: CreateLangueDto) {
    return 'This action adds a new langue';
  }

  findAll() {
    return `This action returns all langues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} langue`;
  }

  update(id: number, updateLangueDto: UpdateLangueDto) {
    return `This action updates a #${id} langue`;
  }

  remove(id: number) {
    return `This action removes a #${id} langue`;
  }
}
