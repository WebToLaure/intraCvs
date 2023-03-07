import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor, BadRequestException } from '@nestjs/common';
import { PresentationsService } from './presentations.service';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { UserGuard } from 'src/auth/user.guard';
import { User } from 'src/users/entities/user.entity';
import { UserRoleEnum } from 'src/enum/user-role.enum';

/**
 * @class PresentationsController
 * Une class permettant :
 * * De réunir plusieurs méthodes CRUD liées à la partie présentation du CV.
 * * De contrôler les informations entrantes, de les vérifier avant de les envoyer en base de données, suivant un protocole précis et renseigné.
 * * Celle-ci est dédiée à la création des présentations, à la recherche via des critères, à la modifification / maj de données et à la suppression d'une présentation.
 */
@UseInterceptors(ClassSerializerInterceptor)
@Controller('presentations')
export class PresentationsController {
  constructor(private readonly presentationsService: PresentationsService,
    private readonly usersService: UsersService) { }


  /** 
   * @method create :
   * 
   * Une méthode permettant de :
   * * Controler les données entrantes lors de la création d'une présentation.
   * * Vérifier et imposer que les contraintes soient bien respectées.
   * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPresentationDto: CreatePresentationDto, @Req() req) {

    if (req.user.presentation) {
      throw new HttpException("Impossible vous avez déjà une présentation", HttpStatus.FORBIDDEN)
    }

    const createdPresentation = await this.presentationsService.createPresentation(req.user, createPresentationDto);

    return {
      statusCode: 201,
      data: createdPresentation,
      message: "Présentation créée"
    }

  }

  /** 
  * @method findAll :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la consultation de toutes les présentations.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
  */
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  async findAll() {
    const presentationExist = await this.presentationsService.findAllPresentation();

    if (!presentationExist) {
      throw new HttpException("Aucune présentations n'existe", HttpStatus.NOT_FOUND);
    }

    return presentationExist;

  }

  /** 
  * @method findOne :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la consultation d'une présentation par son Id.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
  */
  @Get(':id')
  async findOne(@Param('id') id: string) {

    const presentationById = await this.presentationsService.findPresentationById(+id);

    if (!presentationById) {
      throw new HttpException("La présentation n'existe pas", HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: 200,
      data: presentationById,
      message: "Voici votre présentation"
    }
  }

  /** 
  * @method update :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la modification d'une présentation.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
  * * L'user doit être loger pour modifier sa présentation.
  */
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updatePresentation(@Body() updatePresentationDto: UpdatePresentationDto, @Req() req) {

    if (req.user.presentation == null) { // condition permettant de savoir si la présentation de l'user est null ou si elle existe
      throw new HttpException("Impossible veuillez d'abord créer une présentation", HttpStatus.FORBIDDEN)
    }

    // const permettant de controller et d'injecter l'id de la présentation de l'user connecté et d'update les data
    const updatePresentation = await this.presentationsService.updatePresentation(req.user.presentation.id, updatePresentationDto);

    return {
      statusCode: 201,
      message: 'La modification de la présentation a bien été prise en compte',
      data: updatePresentation,
    };
  }
}







/*   @UseGuards(JwtAuthGuard)
  @Delete()
  async deletedPresentation(@Req() req) {

    const userLog = req.user.id
    const user = await this.usersService.findOne(userLog);

    // check user presentation
    if (user.presentation == null) { // condition permettant de savoir si la présentation de l'user est null ou si elle existe
      throw new HttpException("Vous n'avez pas de presentation", HttpStatus.FORBIDDEN)
    }

    const id = user.presentation.id
    user.presentation = null;
    await user.save()

    const deleted = await this.presentationsService.deletePresentation(id);

    if (!deleted) {
      throw new HttpException('Erreur Server', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return { message: `La présentation a bien été supprimée` };
  } */

