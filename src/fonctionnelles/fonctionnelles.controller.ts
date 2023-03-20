import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus, ClassSerializerInterceptor, BadRequestException } from '@nestjs/common';
import { FonctionnellesService } from './fonctionnelles.service';
import { CreateFonctionnelleDto } from './dto/create-fonctionnelle.dto';
import { UpdateFonctionnelleDto } from './dto/update-fonctionnelle.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { UseInterceptors } from '@nestjs/common/decorators';
import { ConsultantGuard } from 'src/auth/consultant.guard';

/**
 * @class PresentationsController
 * 
 * Une class permettant :
 * * De réunir plusieurs méthodes CRUD liées à la partie des compétences fonctionnelles du CV.
 * * De contrôler les informations entrantes, de les vérifier avant de les envoyer en base de données, suivant un protocole précis et renseigné.
 * * Celle-ci est dédiée à la création des compétences fonctionnelles, à la recherche via des critères, à la modifification / maj de données.
 */
@ApiTags('COMPETENCES FONCTIONNELLES')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('fonctionnelles')
export class FonctionnellesController {
  constructor(private readonly fonctionnellesService: FonctionnellesService,
    private readonly usersService: UsersService) {}

  /** 
   * @method create :
   * 
   * Une méthode permettant de :
   * * Controler les données entrantes lors de la création d'une compétence fonctionnelle.
   * * Vérifier et imposer que les contraintes soient bien respectées.
   * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createFonctionnelleDto: CreateFonctionnelleDto, @Req() req) {

    const createFonctionnelle = await this.fonctionnellesService.createFonctionnelle(req.user, createFonctionnelleDto); //controlle les données de creation et les inject ensuite dans la bdd

    return {
      statusCode: 201,
      data: createFonctionnelle,
      message: "Compétence Fonctionnelle créée"
    }
  }

  /** 
  * @method findAllCompetencFonctionnelle :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la consultation de toutes les compétences fonctionnelles.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
  */
  @Get()
  async findAllCompetencFonctionnelle() {
    const fonctionnelleExist = await this.fonctionnellesService.findAllFonctionnelle();

    if (!fonctionnelleExist) {
      throw new HttpException("Pas de compétence fonctionnelle créée", HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      data: fonctionnelleExist,
      message: "Ensemble des Compétences Fonctionnelles "
    }
   
  }

  /** 
  * @method findOneCompetencFonctionnelle :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la consultation d'une compétences fonctionnelle par son Id.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
  */
  @Get(':id')
  async findOneCompetencFonctionnelle(@Param('id') id: string) {

    const fonctionnelleExist = await this.fonctionnellesService.findFonctionnelleById(+id);

    if (!fonctionnelleExist) {
      throw new HttpException("Pas de compétence fonctionnelle créée avec cet id", HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: 200,
      data: fonctionnelleExist,
      message: "Compétence fonctionnelle"
    }
  }

  /** 
  * @method update :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la modification d'une compétence fonctionnelle.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
  * * L'user doit être loger pour modifier ses compétencs fonctionnelles.
  */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number, @Body() updateFonctionnelleDto: UpdateFonctionnelleDto, @Req() req) {
    
    const existingCompetence = await this.fonctionnellesService.findFonctionnelleById(id);
    
    if (!existingCompetence) {
      throw new HttpException("Compétence Fonctionnelle n'existe pas", HttpStatus.FORBIDDEN)
    }

    const updatedCompetence = await this.fonctionnellesService.updateFonctionnelle(+id, updateFonctionnelleDto);
    
    return {
      statusCode: 200,
      data: updatedCompetence,
      message: "Compétence Fonctionnelle modifiée"
    }
  }

  /** 
  * @method remove :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la suppression d'une compétence fonctionnelle'.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
  * * Le développeur doit être loger pour pouvoir supprimer sa compétence fonctionnelle.
  */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const existFonctionnelle = await this.fonctionnellesService.findFonctionnelleById(id);

    if (!existFonctionnelle) {
      throw new HttpException("Compétence Fonctionnelle n'existe pas", HttpStatus.FORBIDDEN)
    }
    const deletedFonctionnelle = await this.fonctionnellesService.deletedFonctionnelle(id);
    return {
      statusCode: 200,
      data: deletedFonctionnelle,
      message: "La Compétence Fonctionnelle a été supprimée",
    };
  }
}
