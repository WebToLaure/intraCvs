import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseInterceptors, ClassSerializerInterceptor, HttpStatus, UseGuards } from '@nestjs/common';
import { LanguesService } from './langues.service';
import { CreateLangueDto } from './dto/create-langue.dto';
import { UpdateLangueDto } from './dto/update-langue.dto';
import { UsersService } from 'src/users/users.service';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('langues')
export class LanguesController {
  constructor(private readonly languesService: LanguesService,
    private readonly usersService: UsersService) { }

    // Création de la langue avec messages d'erreur
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createLangueDto: CreateLangueDto, @Request() req) {

    const languageExist = await this.languesService.findByLanguageAndUser(req.user.userId,createLangueDto.langue);

    if (languageExist){
      throw new HttpException('La langue existe déjà', HttpStatus.NOT_ACCEPTABLE)
    }

    const user = await this.usersService.findOne(req.user.userId)
    const newLanguage = await this.languesService.create(createLangueDto, user);
    
    return {
      statusCode: 201,
      message: `création d'une nouvelle langue réussie`,
      data: newLanguage
    }
  }




  // Récupération de toutes les langues: récupération avec statut
  @Get()
  async findAll() {
    const allLanguages = await this.languesService.findAll();
    return {
      statusCode: 200,
      message: "Récupération réussie de toutes les langues",
      data: allLanguages
    };
  }

  // Récupération d'une langue et message d'erreur
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const oneLanguage = await this.languesService.findOne(+id);
    // Si la langue n'existe pas: message d'erreur
    if (!oneLanguage){
      throw new BadRequestException(`Langue non trouvée`);
    }
    // Si la langue existe: statut avec récupération de la donnée
    return {
      statusCode: 200,
      message: `Récupération réussie de la langue ${id}`,
      data: oneLanguage
    }
  }

  /* // Récupération d'une langue par sa donnée 'langue'
  @Get(':langue')
  async findByLanguage(@Param('langue') langue: string){
    const oneLanguage = await this.languesService.findOneByLangue(langue);
    // Si la langue n'existe pas: message d'erreur
    if (!oneLanguage){
      throw new BadRequestException(`Langue non trouvée`);
    }
    return {
      statusCode: 200,
      message: `Récupération réussie de la langue par la donnée ${langue}`,
      data: oneLanguage
    }
  } */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLangueDto: UpdateLangueDto) {
    return this.languesService.update(+id, updateLangueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languesService.remove(+id);
  }
}
