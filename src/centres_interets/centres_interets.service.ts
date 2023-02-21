import { Injectable } from '@nestjs/common';
import { CreateCentresInteretDto } from './dto/create-centres_interet.dto';
import { UpdateCentresInteretDto } from './dto/update-centres_interet.dto';
import { User } from 'src/users/entities/user.entity';
import { CentresInteret } from './entities/centres_interet.entity';
@Injectable()
export class CentresInteretsService {
  async createInteret(createCentresInteretDto: CreateCentresInteretDto, user: User) {
    const Interets = CentresInteret.create({ ...createCentresInteretDto });
    delete user.password
    Interets.user = user;
    return await Interets.save()
  }

  async findAllInterets(): Promise<CentresInteret[]> {
    return await CentresInteret.find();
  }

  async findInteretById(id: number) {
    const findInteret = await CentresInteret.findOne({ relations: { user: true }, where: { id } });
    if (!findInteret) {
      return undefined;
    }
    return findInteret;
  }

  async updateInteret(id: number, updateCentresInteretDto: UpdateCentresInteretDto) {
    const interet = await CentresInteret.findOneBy({ id });
    if (updateCentresInteretDto.intitule) interet.intitule = updateCentresInteretDto.intitule;
    return await interet.save ();
  }

  async deleteInteret(id: number) {
    return (await CentresInteret.delete({ id })).affected;;

  }



  async findInteretAndUser(userId: number, intitule: string) {
    return await CentresInteret.findOne({ where: { user: { id: userId }, intitule: intitule } });
  }

}
