import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Presentation } from './entities/presentation.entity';

@Injectable()
export class PresentationsService {
  async createPresentation(userLog: User, createPresentationDto: CreatePresentationDto) : Promise<Presentation> {

    const presentation = new Presentation()
    presentation.name = createPresentationDto.name
    presentation.user = userLog
    console.log(userLog);
    
    
    await presentation.save()

    return presentation
  }

  async findAllPresentation() { // recherche l'ensemble des présentations
      return await Presentation.find();
    
  }

  async findPresentationById(id: number) { // recherche une présentation par son id
    return await Presentation.findOneBy({ id: id });
  }

  update(id: number, updatePresentationDto: UpdatePresentationDto) {
    return `This action updates a #${id} presentation`;
  }

  remove(id: number) {
    return `This action removes a #${id} presentation`;
  }
}
