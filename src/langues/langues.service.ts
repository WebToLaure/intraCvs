import { Injectable } from '@nestjs/common';
import { CreateLangueDto } from './dto/create-langue.dto';
import { UpdateLangueDto } from './dto/update-langue.dto';
import { User } from 'src/users/entities/user.entity';
import { Langue } from './entities/langue.entity';

@Injectable()
// Class permettant la gestion des requètes SQL pour les langues
export class LanguesService {

  // Créer une langue dans la BDD
  async create(createLangueDto: CreateLangueDto, user: User) {
    const newLanguage = await Langue.create({...createLangueDto});
    delete user.password
    newLanguage.user = user;
    
      return await newLanguage.save()
  }

  // Trouver toutes les langues dans la BDD
  async findAll() {
    const languages = await Langue.find();
    return languages;
  }

  // Trouver une langue par son id dans la BDD
  async findOne(id: number) {
    const language = await Langue.findOneBy({ id });
    if (language){
      return language
    }
    return undefined;
  }
  

  // Trouver une langue avec l'id du user
  async findByLanguageAndUser(userId: number, langue: string) {
    return await Langue.findOne({ where: { user: { id: userId }, langue: langue } });
  }

  // Trouver une langue avec la donnée langue
  async findOneByLanguage(langue: string) {
    return await Langue.findBy({langue})
  }



  update(id: number, updateLangueDto: UpdateLangueDto) {
    return `This action updates a #${id} langue`;
  }

  remove(id: number) {
    return `This action removes a #${id} langue`;
  }
}
