import { Injectable } from '@nestjs/common';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { User } from 'src/users/entities/user.entity';
import { Competence } from './entities/competence.entity';

@Injectable()

/**@class CompetencesService
 * 
 * * Méthodes liées aux requêtes client.
 * * Méthode permettant de recevoir les données de la source de données,appliquer la logique métier et renvoyer la réponse au controller.
 * * Création de compétences, Recherche via des critères, Modifification des données, Suppression d'une compétence.
 */

export class CompetencesService {

  /** 
  * @method createComp :
  * * Methode permettant de créer une compétence sur son CV utilisateur suivant le modèle CreateCompétenceDto..
  */
  async createComp(createCompetenceDto: CreateCompetenceDto, user: User) {
    const competence = Competence.create({...createCompetenceDto});
    delete user.password;
    competence.user=user;
    return await competence.save();
  }

  /** 
  * @method findAllCompetences:
  * * Methode permettant de rechercher toutes les compétences sur CV utilisateurs(roles consultant et admin).
  */
  async findAllCompetences(): Promise<Competence[]> {
    return await Competence.find();
  }

  /** 
  * @method findCompetenceById :
  * * Methode permettant de rechercher une compétence par son id .
  */
  async findCompetenceById(id: number) {
    const competence = await Competence.findOne({ relations: { user: true }, where: { id } })
    if (!competence) {
      return undefined;
    }
    return competence;
  }

  /** 
  * @method updateComp :
  * * Methode permettant de modifier une compétence sur son CV utilisateur.
  */
  async updateComp(id: number, updateCompetenceDto: UpdateCompetenceDto) {
    const comp = await Competence.findOneBy({ id });
    if (updateCompetenceDto.competence_clé) comp.competence_clé = updateCompetenceDto.competence_clé;
    return await comp.save();
  }

  /** 
  * @method deleteComp :
  * * Methode permettant de supprimer une compétence sur son compte utilisateur.
  */
  async deleteComp(id: number) {
    return await Competence.delete({ id })
  }

  /** 
  * @method findByCompetenceAndUser:
  * * Methode permettant de retourner les données d'une relation user et compétence sur CV utilisateur.
  */
  async findCompetenceAndUser(userId: number, competence_clé: string) {
    return await Competence.findOne({ where: { user: { id: userId }, competence_clé: competence_clé } });
  }

}
