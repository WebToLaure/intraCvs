import { Injectable } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Presentation } from './entities/presentation.entity';

@Injectable()
export class PresentationsService {
  async createPresentation(createPresentationDto: CreatePresentationDto) {

    const presentation = new Presentation()
    presentation.name = createPresentationDto.name
    
    await presentation.save()

    return presentation
  }

  findAllPresentation() {
    return `This action returns all presentations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} presentation`;
  }

  update(id: number, updatePresentationDto: UpdatePresentationDto) {
    return `This action updates a #${id} presentation`;
  }

  remove(id: number) {
    return `This action removes a #${id} presentation`;
  }
}
