import { Injectable } from '@nestjs/common';
import { CreateCentresInteretDto } from './dto/create-centres_interet.dto';
import { UpdateCentresInteretDto } from './dto/update-centres_interet.dto';
import { User } from 'src/users/entities/user.entity';
import { CentresInteret } from './entities/centres_interet.entity';



/** 
* @class CentresInteretsService
* Une classe permettant de gérer les requêtes SQL de plusieurs méthodes CRUD pour la partie centre d'intérêt du CV
*/
@Injectable()
export class CentresInteretsService {

  /** 
 * @method createInteret :
 * Method permettant de créer un centre d'intérêt suivant le modèle du CreateInteretDto.
 */
  async createInteret(createCentresInteretDto: CreateCentresInteretDto, user: User) {
    const interets = CentresInteret.create({ ...createCentresInteretDto });
    delete user.password;
    interets.user = user;
    return await interets.save()
  }

  /** 
  * @method findAllInterets :
  * Method permettant de rechercher tous les CI.
  */
  async findAllInterets(): Promise<CentresInteret[]> {
    return await CentresInteret.find();
  }

  /** 
  * @method findInteretById :
  * Method permettant de rechercher les CI par Id.
  */
  async findInteretById(id: number) {
    const findInteret = await CentresInteret.findOne({ relations: { user: true }, where: { id } });
    if (!findInteret) {
      return undefined;
    }
    return findInteret;
  }

  /** 
 * @method updateInteret :
 * Method permettant de metttre à jour ses CI via un template définit par UpdateInteretDto.
 */
  async updateInteret(id: number, updateCentresInteretDto: UpdateCentresInteretDto) {
    const interet = await CentresInteret.findOneBy({ id });
    if (updateCentresInteretDto.intitule) interet.intitule = updateCentresInteretDto.intitule;
    return await interet.save();
  }

  /** 
* @method deleteInteret :
* Method permettant de supprimer un CI de l'utlisateur connecté.
*/
  async deleteInteret(id: number) {
    return (await CentresInteret.delete({ id })).affected;;

  }

  /** 
 * @method findByInteretAndUser :
 * Method permettant de rechercher un CI de l'utlisateur connecté.
 */
  async findInteretAndUser(id: number, intitule: string) {
    return await CentresInteret.findOne({ where: { user: { id: id }, intitule: intitule } });
  }

}
