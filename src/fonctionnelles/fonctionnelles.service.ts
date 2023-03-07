import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateFonctionnelleDto } from './dto/create-fonctionnelle.dto';
import { UpdateFonctionnelleDto } from './dto/update-fonctionnelle.dto';
import { Fonctionnelle } from './entities/fonctionnelle.entity';

/** 
* @class FonctionnellesService
* Une class permettant de gérer les requêtes SQL de plusieurs méthodes CRUD pour la partie compétence fonctionnelle du CV
*/
@Injectable()
export class FonctionnellesService {

  /** 
  * @method createFonctionnelle :
  * Method permettant de créer une compétence fonctionnelle suivant le modèle du CreatFonctionnelleDto.
  */
  async createFonctionnelle(userLog: User, createFonctionnelleDto: CreateFonctionnelleDto): Promise<Fonctionnelle> {

    const fonctionnelle = new Fonctionnelle()
    fonctionnelle.libelle = createFonctionnelleDto.libelle
    fonctionnelle.user = userLog // permet d'associer l'user à sa compétence fonctionnelle

    await fonctionnelle.save()

    return fonctionnelle
  }

  /** 
  * @method findAllFonctionnelle :
  * Method permettant de rechercher toutes les compétences fonctionnelles.
  */
  async findAllFonctionnelle() {
    return await Fonctionnelle.find();
  }

  /** 
  * @method findFonctionnelleById :
  * Method permettant de rechercher les compétences fonctionnelles par Id.
  */
  async findFonctionnelleById(id: number) {
    return await Fonctionnelle.findOneBy({ id: id });
  }

  /** 
  * @method updateFonctionnelle :
  * Method permettant de metttre à jour ses compétences fonctionnelles via un template définit par UpdateFonctionnelleDto.
  */
  async updateFonctionnelle(id: number, updateFonctionnelleDto: UpdateFonctionnelleDto): Promise<Fonctionnelle> {

    const fonctionnelle = await Fonctionnelle.findOneBy({ id }); // const permettant de retrouver une compétence fonctionnelle par son id

    fonctionnelle.libelle = updateFonctionnelleDto.libelle; // fonctionnelle.libelle = actuelle ; updateFonctionnelleDto.libelle = nouvelle compétence fonctionnelle

    await fonctionnelle.save() // sauvegarde de la nouvelle compétence fonctionnelle

    return fonctionnelle

  }

  /** 
  * @method deletePresentation :
  * Method permettant de supprimer la présentation de l'utlisateur connecté.
  * Avec cette méthode impossible qu'un utilisateur puisse supprimer une autre présentation que la sienne.
  */
  async deletePresentation(id: number): Promise<Fonctionnelle> {

    const dataDeleted = await Fonctionnelle.findOneBy({ id })
    await Fonctionnelle.delete({ id });

    if (dataDeleted) {
      return dataDeleted;
    }

    return undefined;
  }

}
