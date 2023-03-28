import { Injectable } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { ILike } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Formation } from './entities/formation.entity';


/** 
* @class FormationsService
* Une class permettant de gérer les requêtes SQL de plusieurs méthodes CRUD pour la partie formation du CV
*/
@Injectable()
export class FormationsService {


  /** 
 * @method createFormation :
 * Method permettant de créer une formation suivant le modèle du CreatFormationDto.
 */
  async createFormation(createFormationDto: CreateFormationDto, user: User) {
    const formations = Formation.create({ ...createFormationDto });
    delete user.password
    formations.user = user;
    return await formations.save()
  }


  /** 
  * @method findAllFormations :
  * Method permettant de rechercher toutes les formations.
  */
  async findAllFormations(id: number): Promise<Formation[]> {
    return await Formation.find({ where: { user: { id: id } } });
  }


  /** 
  * @method findFormationById :
  * Method permettant de rechercher les formations par Id.
  */
  async findFormationById(id: number, user: User) {
    const formation = await Formation.findOne({ relations: { user: true }, where: { id } });
    delete user.password
    if (!formation) {
      return undefined;
    }
    return formation;
  }


  /** 
 * @method update :
 * Method permettant de metttre à jour ses formations via un template définit par UpdateFormationDto.
 */
  async update(id: number, updateFormationDto: UpdateFormationDto) {
    const formation = await Formation.findOneBy({ id });
    if (!formation) {
      return undefined
    }
    formation.date_obtention = updateFormationDto.date_obtention;
    formation.diplôme = updateFormationDto.diplôme;
    formation.lieu_formation = updateFormationDto.lieu_formation;
    return await formation.save(); //.update(+id, updateFormationDto);
  }


  /** 
 * @method deleteFormation :
 * Method permettant de supprimer une formation de l'utlisateur connecté.
 */
  async deleteFormation(id: number) {
    return (await Formation.delete({ id })).affected;;
  }


  /** 
 * @method findFormationByName :
 * Method permettant de rechercher une formation par son id .
 */
  async findFormationByName(diplôme: string) {
    const findForm = await Formation.findBy({ lieu_formation: ILike(`%${diplôme}%`) });
    if (findForm.length === 0) {
      return undefined
    }
    return findForm;
  }


  /** 
 * @method findByFormationAndUser :
 * Method permettant de rechercher une formation de l'utlisateur connecté.
 */
  async findByFormationAndUser(userId: number, diplôme: string) {
    return await Formation.findOne({ where: { user: { id: userId }, diplôme: diplôme } });
  }

}
