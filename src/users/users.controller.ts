import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Request, ClassSerializerInterceptor, UseInterceptors, BadRequestException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController
{
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  @ApiOperation({ summary: "Création d'un compte utilisateur" })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto)
  {

    const ExistingUser = await this.usersService.findUserByEmail(createUserDto.email);
    if (ExistingUser)
    {
      throw new HttpException("l'email existe déjà", HttpStatus.NOT_ACCEPTABLE);
    }
    createUserDto.password = await encodePassword(createUserDto.password)

    const newAccount = await this.usersService.create(createUserDto);
    return {
      statusCode: 201,
      message: "Création réussie d'un nouveau compte",
      data: newAccount
    }
  }


  @Get()
  async findAll()
  {
    const allUsers = await this.usersService.findAll();
    return {
      statusCode: 200,
      message: "Récupération réussie de tous les users",
      data: allUsers
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number)
  {
    const oneUser = await this.usersService.findOne(id);
    if (!oneUser)
    {
      throw new BadRequestException('User non trouvé')
    }
    return {
      statusCode: 200,
      message: `Récupération réussie du user ${id}`,
      data: oneUser
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(@Body() updateUserDto: UpdateUserDto,@Request() req){

    const account = req.user.id
    
    /* const isUserExists = await this.usersService.findOne(account);
    if( !isUserExists){
      throw new HttpException(`L'user demandé n'existe pas`, HttpStatus.NOT_FOUND);
    } */
    const updatedUser = await this.usersService.update(account, updateUserDto);

    if (!updatedUser){
      throw new HttpException('Erreur Server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {
      statusCode: 201,
      message: 'Modifications enregistrées du user',
      data: updatedUser
    };
  }

  
  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto)
  {

    const isUserExists = await this.usersService.findOne(id);
    if (!isUserExists)
    {
      throw new BadRequestException('User non trouvée');
    }

    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser){
      throw new HttpException('Erreur Server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {
      statusCode: 201,
      message: 'Modifications enregistrées du user',
      data: updatedUser
    }
  }

  // Suppression de son propre compte
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Supprimer un compte utilisateur' })
  @ApiResponse({ status: 200, description: 'Compte supprimé' })
  @Delete()
  @ApiProperty()
  async removeUser(@Request() req){
    const account = req.user.id
    
    const user = await this.usersService.findOne(account);
    if (!user){
      throw new HttpException(`L'user demandé n'existe pas`, HttpStatus.NOT_FOUND);
    }
    const deletedUser = await this.usersService.remove(user);
    if (!deletedUser){
      throw new HttpException('Erreur Server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {
      statusCode: 201,
      message: 'Suppression enregistrées du user',
      data: deletedUser
    };
  }

  // Suppression d'un user par son id pour l'admin
  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isUserExists = await this.usersService.findOne(+id);
    if (!isUserExists) {
      throw new BadRequestException('User non trouvée');
    }
    const deletedUser = await isUserExists.remove();
    if (!deletedUser){
      throw new HttpException('Erreur Server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {
      statusCode: 201,
      message: 'Suppression enregistrées du user',
      data: deletedUser
    }
  }
}
