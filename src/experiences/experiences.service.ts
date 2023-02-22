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



  // Trouver toutes les expériences
  async findAll() {
    const experience = await Experience.find()
    return experience;
  }

  // Trouver une expérience par son id
  async findOne(id: number) {
    const oneExperirence = await Experience.findOneBy({id});
    if (oneExperirence){
      return oneExperirence
    }
    return undefined;
  }

  // Trouver une expérience par un intitulé_poste
  async findOneByPoste(intitulé_poste: string){
    return await Experience.findOneBy({intitulé_poste})
  }


  // Modifier une expérience
  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    const updatedExperience = await Experience.update(+id, updateExperienceDto);
    if (updatedExperience) {
      return Experience.findOneBy({id})
    }
    return undefined;
  }

  remove(id: number) {
    return `This action removes a #${id} experience`;
  }
}
