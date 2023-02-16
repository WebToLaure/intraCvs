import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Request, ParseIntPipe, ClassSerializerInterceptor, UseInterceptors, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';



@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation ({ summary: "Création d'un compte utilisateur" })
  @ApiResponse ({ status: 403, description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto) {

    const ExistingUser = await this.usersService.findUserByEmail(createUserDto.email);
    if (ExistingUser) {
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
  async findAll() {
    const allUsers = await this.usersService.findAll();
    return {
      statusCode: 200,
      message: "Récupération réussie de tous les users",
      data: allUsers
    } ;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const oneUser = await this.usersService.findOne(id);
    return {
      statusCode: 200,
      message: `Récupération réussie du user ${id}`,
      data: oneUser
    };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    
    const isUserExists = await this.usersService.findOne(id);
    if (!isUserExists) {
      throw new BadRequestException('User non trouvée');
    }

    const updatedUser = await this.usersService.update(id, updateUserDto);
    return {
      statusCode: 201,
      message: 'Modifications enregistrées du user',
      data: updatedUser
    }
  }


  
  @Delete(':id')
  async remove(@Param('id') id: string) {

    const isUserExists = await this.usersService.findOne(+id);
    if (!isUserExists) {
      throw new BadRequestException('User non trouvée');
    }

    const deletedUser = await isUserExists.remove();
    return {
      statusCode: 201,
      message: 'Suppression enregistrées du user',
      data: deletedUser
    }
  }
}
