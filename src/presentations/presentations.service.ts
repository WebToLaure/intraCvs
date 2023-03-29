import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Presentation } from './entities/presentation.entity';

/** 
* @class PresentationsService
* Une class permettant de gérer les requêtes SQL de plusieurs méthodes CRUD pour la partie présentation du CV
*/
@Injectable()
export class PresentationsService {

  /** 
  * @method createPresentation :
  * Method permettant de créer une compétence fonctionnelle suivant le modèle du CreatPresentationDto.
  */
  async createPresentation(userLog: User, createPresentationDto: CreatePresentationDto): Promise<Presentation> {

    const presentation = new Presentation()
    presentation.name = createPresentationDto.name
    presentation.user = userLog

    await presentation.save()

    return presentation
  }

  /** 
   * @method findAllPresentation :
   * Method permettant de rechercher toutes les présentations.
   */
  async findAllPresentation() { // recherche l'ensemble des présentations
    return await Presentation.find();
  }

  /** 
  * @method findPresentationById :
  * Method permettant de rechercher les présentations par Id.
  */
  async findPresentationById(id: number) { // recherche une présentation par son id
    return await Presentation.findOneBy({ id: id });
  }

  /** 
  * @method updatePresentation :
  * Method permettant de metttre à jour sa présentation via un template définit par UpdatePresentationDto.
  */
  async updatePresentation(id: number, updatePresentationDto: UpdatePresentationDto): Promise<Presentation> {

    const presentation = await Presentation.findOneBy({ id }); // const permettant de retrouver une présentation par son id

    presentation.name = updatePresentationDto.name; // presentation.name = actuelle ; updatePresentationDto.name = nouvelle

    await presentation.save() // sauvegarde de la nouvelle presentation

    return presentation
  }

}
