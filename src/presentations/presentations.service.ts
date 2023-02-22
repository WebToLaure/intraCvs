import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Presentation } from './entities/presentation.entity';

@Injectable()
export class PresentationsService {
  async createPresentation(userLog: User, createPresentationDto: CreatePresentationDto): Promise<Presentation> {

    const presentation = new Presentation()
    presentation.name = createPresentationDto.name
    presentation.user = userLog

    await presentation.save()

    return presentation
  }

  async findAllPresentation() { // recherche l'ensemble des présentations
    return await Presentation.find();
  }

  async findPresentationById(id: number) { // recherche une présentation par son id
    return await Presentation.findOneBy({ id: id });
  }

  async updatePresentation(id: number, updatePresentationDto: UpdatePresentationDto): Promise<Presentation> {

    const presentation = await Presentation.findOneBy({id}); // const permettant de retrouver une présentation par son id

    presentation.name = updatePresentationDto.name; // presentation.name = actuelle ; updatePresentationDto.name = nouvelle

    await presentation.save() // sauvegarde de la nouvelle presentation

    return presentation
  }

}

/* async deletePresentation(id: number) { 

  const presentation = await Presentation.findOneBy({id}); // const permettant de retrouver une présentation par son id
  return await presentation.remove();
  //return await Presentation.delete({ id });
  // return presentation
} */