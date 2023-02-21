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

    const presentation = await Presentation.findOneBy({id});

    presentation.name = updatePresentationDto.name;

    await Presentation.save(presentation);

    if (presentation){
      return this.findPresentationById(id)
    }

    return undefined
  }

  async deletePresentation(id: number | any) { 

    const dataDeleted = await Presentation.delete({ id });

    if (dataDeleted) {
      return dataDeleted;
    }

    return undefined;
  }
}
