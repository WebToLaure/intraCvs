import { Injectable } from '@nestjs/common';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { User } from 'src/users/entities/user.entity';
import { Competence } from './entities/competence.entity';

@Injectable()
export class CompetencesService {
  async create(createCompetenceDto: CreateCompetenceDto, user:User) {
    const competence = new Competence();
    competence.competences_clés=createCompetenceDto.competences_clés;
    delete user.password;
    return await competence.save();
  }

  findAll() {
    return `This action returns all competences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} competence`;
  }

  update(id: number, updateCompetenceDto: UpdateCompetenceDto) {
    return `This action updates a #${id} competence`;
  }

  remove(id: number) {
    return `This action removes a #${id} competence`;
  }


  async findCompetenceAndUser(userId: number, competences_clés:string) {
    return await Competence.findOne({ where: { user: { id: userId }, competences_clés : competences_clés} });
  }




}
