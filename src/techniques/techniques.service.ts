import { Injectable } from '@nestjs/common';
import { CreateTechniqueDto } from './dto/create-technique.dto';
import { UpdateTechniqueDto } from './dto/update-technique.dto';

@Injectable()
export class TechniquesService {
  create(createTechniqueDto: CreateTechniqueDto) {
    return 'This action adds a new technique';
  }

  findAll() {
    return `This action returns all techniques`;
  }

  findOne(id: number) {
    return `This action returns a #${id} technique`;
  }

  update(id: number, updateTechniqueDto: UpdateTechniqueDto) {
    return `This action updates a #${id} technique`;
  }

  remove(id: number) {
    return `This action removes a #${id} technique`;
  }
}
