import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Request, ParseIntPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';



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
    createUserDto.email = await encodePassword(createUserDto.email)

    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
