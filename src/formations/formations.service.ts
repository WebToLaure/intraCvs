import { Injectable } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FormationsService {
  create(createFormationDto: CreateFormationDto) {
    return 'This action adds a new formation';
  }

  findAll() {
    return `This action returns all formations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formation`;
  }

  update(id: number, updateFormationDto: UpdateFormationDto) {
    return `This action updates a #${id} formation`;
  }

  remove(id: number) {
    return `This action removes a #${id} formation`;
  }
}
