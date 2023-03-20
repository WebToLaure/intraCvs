import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseInterceptors, ClassSerializerInterceptor, HttpStatus, UseGuards } from '@nestjs/common';
import { LanguesService } from './langues.service';
import { CreateLangueDto } from './dto/create-langue.dto';
import { UpdateLangueDto } from './dto/update-langue.dto';
import { UsersService } from 'src/users/users.service';
import { BadRequestException, ConflictException, HttpException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags(`LANGUES`)
@Controller('langues')
@UseGuards(JwtAuthGuard)
export class LanguesController
{
  constructor(private readonly languesService: LanguesService,
    private readonly usersService: UsersService) { }



  // Création de la langue avec messages d'erreur
  @ApiBody({ type: CreateLangueDto})
  @ApiOperation({ summary: `Ajout d'une langue sur un compte utilisateur`})
  @Post()
  async create(@Body() createLangueDto: CreateLangueDto, @Request() req)
  {
    // Vérifier si la langue existe déjà pour le user
    const languageExist = await this.languesService.findByLanguageAndUser(req.user.userId, createLangueDto.langue);

    if (languageExist)
    {
      throw new HttpException('La langue existe déjà', HttpStatus.BAD_REQUEST)
    }
    // Créer la langue pour le user défini
    
    const newLanguage = await this.languesService.create(createLangueDto, req.user);

    return {
      statusCode: 201,
      message: `création d'une nouvelle langue réussie`,
      data: newLanguage
    }
  }




  // Récupération de toutes les langues: récupération avec statut
  @ApiBody({ type: CreateLangueDto})
  @ApiOperation({ summary: `Récupération de toutes les langues utilisateur`})
  @Get()
  async findAll()
  {
    const allLanguages = await this.languesService.findAll();
    return {
      statusCode: 200,
      message: "Récupération réussie de toutes les langues",
      data: allLanguages
    };
  }




  // Récupération d'une langue et message d'erreur
  @ApiOperation({ summary: `Récupération d'une langue par son id`})
  @Get(':id')
  async findOne(@Param('id') id: string)
  {
    const oneLanguage = await this.languesService.findOne(+id);
    // Si la langue n'existe pas: message d'erreur
    if (!oneLanguage)
    {
      throw new BadRequestException(`Langue non trouvée`);
    }
    // Si la langue existe: statut avec récupération de la donnée
    return {
      statusCode: 200,
      message: `Récupération réussie de la langue ${id}`,
      data: oneLanguage
    }
  }




  // Récupération d'une langue par sa donnée 'langue'
  @ApiOperation({ summary: `Récupération de la langue par le langage enregistré`})
  @Get('langues/:langue')
  async findByLanguage(@Param('langue') langue: string)
  {
    const oneLanguage = await this.languesService.findOneByLanguage(langue);
    // Si la langue n'existe pas: message d'erreur
    if (!oneLanguage)
    {
      throw new BadRequestException(`Langue non trouvée`);
    }
    return {
      statusCode: 200,
      message: `Récupération réussie de la langue par la donnée`,
      data: oneLanguage
    }
  }

  // Modifier une langue
  @ApiOperation({ summary: `Modification d'une langue par son id`})
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateLangueDto: UpdateLangueDto)
  {

    // Vérifie si la langue à modifier existe
    const languageExist = await this.languesService.findOne(id);
    if (!languageExist)
    {
      throw new BadRequestException('la langue n\'existe pas')
    }
    
    // Vérifier que la nouvelle langue n'existe pas déjà
    if (updateLangueDto.langue)
    {
      const newLanguage = await this.languesService.findOneByLanguage(updateLangueDto.langue)
      if (newLanguage && languageExist.langue !== updateLangueDto.langue)
      {
        throw new ConflictException('Cette langue existe déjà');
      }
      
    }

    // Modifier la langue concernée
    const updatedLanguage = await this.languesService.update(+id, updateLangueDto);
    return {
      statusCode: 200,
      message: `La langue a été modifiée`,
      data: updatedLanguage
    }
  }



  // Supprimer une langue
  @ApiOperation({ summary: `Suppression de la langue par son id`})
  @Delete(':id')
  async remove(@Param('id') id: string)
  {
    // Vérifier que la langue existe
    const languageExist = await this.languesService.findOne(+id)
    if(!languageExist){
      throw new BadRequestException('la langue n\'existe pas');
    }

    // Supprimer la langue concernée
    const deletedLanguage = await this.languesService.remove(+id);

    return {
      statusCode: 200,
      message: `Suppression de la langue réussie`,
      data: deletedLanguage
    }
  }
}
