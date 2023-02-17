import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';



/**
 * Ensemble des services pour la table User:
 * 
 * * **create**           : permet de créer un user dans la BDD.
 * * **findUserByEmail**  : permet de récupérer un user de la BDD par son mail
 * * **finAll**           : permet de récupérer tous les users de la BDD
 * * **findOne**          : permet de récupérer un user de la BDD par son id
 * * **update**           : permet de modifier un user de la BDD par son id
 * * **remove**           : permet de supprimer un user de la BDD par son id */
@Injectable()
//Class permettant la gestion des requètes SQL pour les compétences
export class UsersService
{


  // Créer un user dans la BDD
  async create(createUserDto: CreateUserDto)
  {
    const user = await User.create({ ...createUserDto }).save();
    delete user.password;
    return user;
  }


  // Trouver un user dans la BDD par son email
  async findUserByEmail(email: string)
  {
    return await User.findOneBy({ email });
  }


  // Trouver tous les users dans la BDD 
  async findAll()
  {
    const users = await User.find();
    return users;
  }


  // Trouver un user dans la BDD par son id
  async findOne(id: number)
  {
    const user = await User.findOneBy({ id })

    if (user)
    {
      return user;
    }
    return undefined;
  }


  // Modifier un user dans la BDD par son id
  async update(id: number, updateUserDto: UpdateUserDto)
  {

    const updatedUser = await User.findOneBy({id});

    updatedUser.firstname = updateUserDto.firstname,
    updatedUser.lastname = updateUserDto.lastname,
    updatedUser.telephone = updateUserDto.telephone,
    updatedUser.password = updateUserDto.password,
    updatedUser.poste_actuel = updateUserDto.poste_actuel,
    updatedUser.classe_professionnelle = updateUserDto.classe_professionnelle,
    updatedUser.ville_affectation = updateUserDto.ville_affectation,
    updatedUser.region_affectation = updateUserDto.region_affectation

    await User.save(updatedUser);

    return updatedUser
  }




// Supprimer un user dans la BDD par son id
  async remove(id: number | any) {
    const user = await User.remove(id);

    if (user) {
      return user;
    }
    return undefined
  }
}
