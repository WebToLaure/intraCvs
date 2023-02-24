import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus, ClassSerializerInterceptor, BadRequestException } from '@nestjs/common';
import { FonctionnellesService } from './fonctionnelles.service';
import { CreateFonctionnelleDto } from './dto/create-fonctionnelle.dto';
import { UpdateFonctionnelleDto } from './dto/update-fonctionnelle.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { UseInterceptors } from '@nestjs/common/decorators';


@ApiTags('FONCTIONNELLES')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('fonctionnelles')
export class FonctionnellesController {
  constructor(private readonly fonctionnellesService: FonctionnellesService,
    private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createFonctionnelleDto: CreateFonctionnelleDto, @Req() req) {

    const userLog = req.user.userId // récupération de l'id de l'user logger
    const user = await this.usersService.findOne(userLog); // récupération de l'user et de ses données

    const createFonctionnelle = await this.fonctionnellesService.createFonctionnelle(user, createFonctionnelleDto); //controlle les données de creation et les inject ensuite dans la bdd

    return {
      statusCode: 201,
      data: createFonctionnelle,
      message: "Présentation créée"
    }
  }

  @Get()
  async findAllCompetencFonctionnelle() {
    const fonctionnelleExist = await this.fonctionnellesService.findAllFonctionnelle();

    if (!fonctionnelleExist) {
      throw new HttpException("Pas de compétence fonctionnelle créées", HttpStatus.NOT_FOUND);
    }

    return fonctionnelleExist;
  }

  @Get(':id')
  async findOneCompetencFonctionnelle(@Param('id') id: string) {

    const fonctionnelleExist = await this.fonctionnellesService.findFonctionnelleById(+id);

    if (!fonctionnelleExist) {
      throw new HttpException("Pas de compétence fonctionnelle créées avec cet id", HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: 200,
      data: fonctionnelleExist,
      message: "Voici votre compétence fonctionnelle"
    }
  }


  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(
    @Param('id') id: number, @Body() updateFonctionnelleDto: UpdateFonctionnelleDto, @Req() req) {
    
    const existingCompetence = await this.fonctionnellesService.findFonctionnelleById(id);
    
    if (!existingCompetence) {
      throw new HttpException("Competence Fonctionnelle n'existe pas", HttpStatus.FORBIDDEN)
    }

    const updatedCompetence = await this.fonctionnellesService.updateFonctionnelle(+id, updateFonctionnelleDto);
    
    return {
      statusCode: 201,
      data: updatedCompetence,
      message: "Update Competence Fonctionnelle"
    }
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const existFonctionnelle = await this.fonctionnellesService.findFonctionnelleById(id);

    if (!existFonctionnelle) {
      throw new HttpException("Competence Fonctionnelle n'existe pas", HttpStatus.FORBIDDEN)
    }
    const deletedPresentation = await this.fonctionnellesService.deletePresentation(id);
    return {
      statusCode: 201,
      data: deletedPresentation,
      message: "La Competence Fonctionnelle est supprimée",
    };
  }
}
