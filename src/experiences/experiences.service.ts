import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience } from './entities/experience.entity';

/**
 * Ensemble des services pour la table Expériences:
 * * **create**: permet de créer une expérience dans la BDD
 * * **findByExperienceAndUser**: permet de trouver une expérience avec l'id du user dans la BDD
 * * **findAll**: permet de trouver toutes les expériences dans la BDD
 * * **findOne**: permer de trouver une expérience par son id dans la BDD
 * * **findOneByPoste**: permet de trouver une expérience par un intitulé_poste dans la BDD
 * * **update**: permet de modifier une expérience par son id dans la BDD
 * * ** delete**: permet de supprimer une expérience par son id dans la BDD
 */
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



  // Trouver une expérience avec l'id du user
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

  // Supprimer une expérience
  async remove(id: number) {
    const deletedExperience = await Experience.findOneBy({id})
    deletedExperience.remove();
    if (deletedExperience){
      return deletedExperience
    }
    return undefined;
  }
}
