import { Injectable } from '@nestjs/common';
import { CreateCentresInteretDto } from './dto/create-centres_interet.dto';
import { UpdateCentresInteretDto } from './dto/update-centres_interet.dto';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class CentresInteretsService {
  create(createCentresInteretDto: CreateCentresInteretDto) {
    return 'This action adds a new centresInteret';
  }

  findAll() {
    return `This action returns all centresInterets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} centresInteret`;
  }

  update(id: number, updateCentresInteretDto: UpdateCentresInteretDto) {
    return `This action updates a #${id} centresInteret`;
  }

  remove(id: number) {
    return `This action removes a #${id} centresInteret`;
  }
}
