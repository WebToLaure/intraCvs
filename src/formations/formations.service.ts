import { Injectable } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Like } from 'typeorm';
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

  async findAllFormations(): Promise<Formation[]> {
    return await Formation.find();
  }

  async findFormationById(id: number) {
    const formation = await Formation.findOne({ relations: { user: true }, where: { id } })
    if (!formation) {
      return undefined;
    }
    return formation;
  }

  update(id: number, updateFormationDto: UpdateFormationDto) {
    return `This action updates a #${id} formation`;
  }

  async deleteFormation(id: number) {
    return (await Formation.delete({ id })).affected;;
  }


  async findFormationByName(formation: string) {
    const name = await Formation.findBy({ formation: Like(`%${formation}%`) });
    if (name.length === 0) {
      return undefined
    }
    return name;
  }


  async findByFormationAndUser(userId: number, formation: string) {
    return await Formation.findOne({ where: { user: { id: userId }, formation: formation } });
  }

}
