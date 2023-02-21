import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience } from './entities/experience.entity';

@Injectable()
// Class permettant la gestion des requètes SQL pour les expériences
export class ExperiencesService {

  // Créer une expérience dans la BDD
  async create(createExperienceDto: CreateExperienceDto, user: User) {
    const newExperience = Experience.create({ ...createExperienceDto});
    delete user.password;
    newExperience.user = user;

    return await newExperience.save();
  }

  // Trouver un intitulé_poste avec l'id du user
  async findByExperienceAndUser(userId: number, intitulé_poste: string){
    return await Experience.findOne({ where: { user: { id: userId }, intitulé_poste: intitulé_poste } })
  }

  findAll() {
    return `This action returns all experiences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} experience`;
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return `This action updates a #${id} experience`;
  }

  remove(id: number) {
    return `This action removes a #${id} experience`;
  }
}
