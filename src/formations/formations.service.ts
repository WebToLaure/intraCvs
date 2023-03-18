import { Injectable } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { ILike } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Formation } from './entities/formation.entity';

@Injectable()
export class FormationsService {
  async createFormation(createFormationDto: CreateFormationDto, user: User) {
    const formations = Formation.create({ ...createFormationDto });
    delete user.password
    formations.user = user;
    return await formations.save()
  }

  async findAllFormations(id: number): Promise<Formation[]> {
    return await Formation.find({ where: { user: { id: id } } });
  }

  async findFormationById(id: number, user: User) {
    const formation = await Formation.findOne({ relations: { user: true }, where: { id } });
    delete user.password
    if (!formation) {
      return undefined;
    }
    return formation;
  }

  async update(id: number, updateFormationDto: UpdateFormationDto) {
    const formation = await Formation.findOneBy({ id });
    if (!formation) {
      return undefined
    }
    return await Formation.update(+id, updateFormationDto);
  }

  async deleteFormation(id: number) {
    return (await Formation.delete({ id })).affected;;
  }

  async findFormationByName(diplôme: string) {
    const findForm = await Formation.findBy({ lieu_formation: ILike(`%${diplôme}%`) });
    if (findForm.length === 0) {
      return undefined
    }
    return findForm;
  }


  async findByFormationAndUser(userId: number, diplôme: string) {
    return await Formation.findOne({ where: { user: { id: userId }, lieu_formation: diplôme } });
  }

}
