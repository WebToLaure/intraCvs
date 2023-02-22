import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus, BadRequestException, ConflictException } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



@Controller('experiences')
export class ExperiencesController
{
  constructor(private readonly experiencesService: ExperiencesService,
    private readonly usersService: UsersService) { }
  // Création d'une expérience
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createExperienceDto: CreateExperienceDto, @Request() req)
  {
    // Vérifier si l'expérience existe déjà pour le user
    const experienceExist = await this.experiencesService.findByExperienceAndUser(req.user.userId, createExperienceDto.intitulé_poste)
    if (experienceExist)
    {
      throw new HttpException('L\'expérience existe déjà', HttpStatus.NOT_ACCEPTABLE)
    }
    // Créer l'expérience pour le user défini
    const user = await this.usersService.findOne(req.user.userId)
    const newExperience = await this.experiencesService.create(createExperienceDto, user)
    return {
      statusCode: 201,
      message: `Création d'une nouvelle expérience`,
      data: newExperience
    }
  }


  // Trouver toutes les expérience
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





  @Delete(':id')
  remove(@Param('id') id: string)
  {
    return this.experiencesService.remove(+id);
  }
}
