import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateFonctionnelleDto } from './dto/create-fonctionnelle.dto';
import { UpdateFonctionnelleDto } from './dto/update-fonctionnelle.dto';
import { Fonctionnelle } from './entities/fonctionnelle.entity';

@Injectable()
export class FonctionnellesService {
  async createFonctionnelle(userLog : User, createFonctionnelleDto: CreateFonctionnelleDto) : Promise<Fonctionnelle> {

    const fonctionnelle = new Fonctionnelle()
    fonctionnelle.libelle = createFonctionnelleDto.libelle
    fonctionnelle.user = userLog // permet d'associer l'user à sa compétence fonctionnelle

    await fonctionnelle.save()

    return fonctionnelle
  }

  async findAllFonctionnelle() {
    return await Fonctionnelle.find();
  }

  async findFonctionnelleById(id: number) {
    return await Fonctionnelle.findOneBy({ id: id });
  }

  async updateFonctionnelle(id: number, updateFonctionnelleDto: UpdateFonctionnelleDto): Promise<Fonctionnelle> {

    const fonctionnelle = await Fonctionnelle.findOneBy({id}); // const permettant de retrouver une compétence fonctionnelle par son id

    fonctionnelle.libelle = updateFonctionnelleDto.libelle; // fonctionnelle.libelle = actuelle ; updateFonctionnelleDto.libelle = nouvelle compétence fonctionnelle

    await fonctionnelle.save() // sauvegarde de la nouvelle compétence fonctionnelle

    return fonctionnelle

  }

  async deletePresentation(id: number): Promise<Fonctionnelle> {

  const dataDeleted = await Fonctionnelle.findOneBy({ id })
  await Fonctionnelle.delete({ id });

  if (dataDeleted) {
    return dataDeleted;
  }

  return undefined;
}

}
