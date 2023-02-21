import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService,
    private readonly usersService: UsersService) { }
  // Création d'une expérience
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createExperienceDto: CreateExperienceDto, @Request() req) {
    // Vérifier si l'expérience existe déjà pour le user
    const experienceExist = await this.experiencesService.findByExperienceAndUser(req.user.userId, createExperienceDto.intitulé_poste)
    if(experienceExist){
      throw new HttpException('L\'expérience existe déjà', HttpStatus.NOT_ACCEPTABLE)
    }
    // Créer l'expérience pour le user défini
    const user =await this.usersService.findOne(req.user.userId)
    const newExperience = await this.experiencesService.create(createExperienceDto, user)
    return {
      statusCode: 201,
      message: `Création d'une nouvelle expérience`,
      data: newExperience
    }
  }

  //







  @Get()
  findAll() {
    return this.experiencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto) {
    return this.experiencesService.update(+id, updateExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(+id);
  }
}
