import { Injectable } from '@nestjs/common';
import { CreateTechniqueDto } from './dto/create-technique.dto';
import { UpdateTechniqueDto } from './dto/update-technique.dto';
import { User } from 'src/users/entities/user.entity';
import { Technique } from './entities/technique.entity';

@Injectable()

/**@class TechniquesService
 * 
 * * Méthodes liées aux requêtes client.
 * * Méthode permettant de recevoir les données de la source de données,appliquer la logique métier et renvoyer la réponse au controller.
 * * Création de compétences techniques, Recherche via des critères, Modifification des données, Suppression d'une compétence.
 */

export class TechniquesService {

  /** 
  * @method createCompTech :
  * * Methode permettant de créer une compétence technique sur son CV utilisateur suivant le modèle CreateCompétenceDto..
  */
  async createCompTech(createTechniqueDto: CreateTechniqueDto, user: User) {
    const compTech = Technique.create({...createTechniqueDto});
    delete user.password;
    compTech.user = user;
    return await compTech.save();
  }

  /** 
  * @method findAllCompTech:
  * * Methode permettant de rechercher toutes les compétences sur CV utilisateurs(roles consultant et admin).
  */
  async findAllCompTech(): Promise<Technique[]> {
    return await Technique.find();
  }

  /** 
  * @method findCompTechById :
  * * Methode permettant de rechercher une compétence technique par son id .
  */
  async findCompTechById(id: number) {
    const compTech = await Technique.findOne({ relations: { user: true }, where: { id } })
    if (!compTech) {
      return undefined;
    }
    return compTech;
  }

  /** 
  * @method updateCompTech :
  * * Methode permettant de modifier une compétence technique sur son CV utilisateur.
  */
  async updateCompTech(id: number, updateTechniqueDto: UpdateTechniqueDto) {
    const compTech = await Technique.findOneBy({ id });
    if (updateTechniqueDto.libelle) compTech.libelle = updateTechniqueDto.libelle;
    return await compTech.save();
  }

  /** 
  * @method deleteCompTech :
  * * Methode permettant de supprimer une compétence technique sur son compte utilisateur.
  */
  async deleteCompTech(id: number) {
    return await Technique.delete({ id })
  }

  /** 
  * @method findByCompTechAndUser:
  * * Methode permettant de retourner les données d'une relation user et compétence technique sur CV utilisateur.
  */
  async findCompTechAndUser(userId: number, libelle: string) {
    return await Technique.findOne({ where: { user: { id: userId }, libelle: libelle } });
  }

}
