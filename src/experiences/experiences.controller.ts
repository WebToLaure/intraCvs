import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus, BadRequestException, ConflictException, UseInterceptors } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer/class-serializer.interceptor';


@ApiTags(`EXPERIENCES`)
@Controller('experiences')
@UseInterceptors(ClassSerializerInterceptor)
export class ExperiencesController
{
  constructor(private readonly experiencesService: ExperiencesService,
    private readonly usersService: UsersService) { }


  // Création d'une expérience
  @ApiBody({ type: CreateExperienceDto})
  @ApiOperation({ summary: `Ajout d'une expérience sur un compte utilisateur`})
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createExperienceDto: CreateExperienceDto, @Request() req)
  {
    // Vérifier si l'expérience existe déjà pour le user
    const experienceExist = await this.experiencesService.findByExperienceAndUser(req.user.id, createExperienceDto.intitulé_poste)
    if (experienceExist)
    {
      throw new HttpException('L\'expérience existe déjà', HttpStatus.NOT_ACCEPTABLE)
    }
    // Créer l'expérience pour le user défini
    
    const newExperience = await this.experiencesService.create(createExperienceDto, req.user)
    return {
      statusCode: 201,
      message: `Création d'une nouvelle expérience`,
      data: newExperience
    }
  }


  // Trouver toutes les expérience
  @ApiBody({ type: CreateExperienceDto})
  @ApiOperation({ summary: `Récupération de l'ensemble des expériences utilisateur`})
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll()
  {
    const allExperiences = await this.experiencesService.findAll();
    return {
      statusCode: 200,
      message: `Récupération réussie de toutes les compétences`,
      data: allExperiences
    }
  }



  // Trouver une expérience par son id
  @ApiOperation({ summary: `Récupération d'une expérience par son id`})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string)
  {
    const oneExperirence = await this.experiencesService.findOne(+id);
    if (!oneExperirence){
      throw new BadRequestException(`Compétence non trouvée`);
    }
    // Si l'expérience existe: statut avec récupération de la donnée
    return {
      statusCode: 200,
      message: `Récupération réussie de la compétence`,
      data: oneExperirence
    };
  }



  // Trouver une expérience par un intitulé_poste
  @ApiOperation({ summary: `Récupération d'une expérience par un intitulé_poste`})
  @UseGuards(JwtAuthGuard)
  @Get('experiences/:intitulé_poste')
  async findByExperience(@Param('intitulé_poste') intitulé_poste: string){
    const experience = await this.experiencesService.findOneByPoste(intitulé_poste);
    if(!experience){
      throw new BadRequestException(`intitulé_poste non trouvé`);
    }
    return {
      statusCode: 200,
      message: `Récupération réussie de l'intitulé_poste`,
      data: experience
    }
  }




  // Modifier une expérience
  @ApiOperation({ summary: `Modification d'une expérience par son id`})
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateExperienceDto: UpdateExperienceDto)
  {
    // Vérifier si l'expérience à modifier existe
    const experienceExist = await this.experiencesService.findOne(id);
    if (!experienceExist){
      throw new BadRequestException(`L'expérience n'existe pas`)
    }
    // Vérifier que la nouvelle expérience n'existe pas déjà
    if(updateExperienceDto.intitulé_poste){
      const newExperience = await this.experiencesService.findOneByPoste(updateExperienceDto.intitulé_poste)
      if(newExperience && experienceExist.intitulé_poste !== updateExperienceDto.intitulé_poste){
        throw new ConflictException('Cette expérience existe déjà');
      }
    }
    // Modifier l'expérience concernée
    const updatedExperience = await this.experiencesService.update(+id, updateExperienceDto);
    return {
      statusCode: 201,
      message: `L'expérience a été modifiée`,
      data: updatedExperience
    }
  }




  // Supprimer une experience
  @ApiOperation({ summary: `Suppression d'une expression par son id`})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string)
  {
    // Vérifier que l'expérience existe
    const experienceExist = await this.experiencesService.findOne(+id);
    if (!experienceExist){
      throw new BadRequestException(`L'expérience n'existe pas`);
    }
    // Supprimer l'expérience concernée
    const deletedExperience = await this.experiencesService.remove(+id);
    return{
      statusCode: 201,
      message: `Suppression de l'expérience réussie`,
      data: deletedExperience
    }
  }
}
