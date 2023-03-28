import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, HttpException, Request, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { FormationsService } from './formations.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { UsersService } from 'src/users/users.service';


/**
 * @class FormationsController
 * 
 * Une class permettant :
 * * De réunir plusieurs méthodes CRUD liées à la partie formations du CV.
 * * De contrôler les informations entrantes, de les vérifier avant de les envoyer en base de données, suivant un protocole précis et renseigné.
 * * Celle-ci est dédiée à la création des formations, à la recherche via des critères, à la modifification / maj de données.
 */
@ApiTags("FORMATIONS")
@Controller('formations')

export class FormationsController {
  constructor(private readonly formationsService: FormationsService,
    private readonly usersService: UsersService) { }

  /** 
 * @method createFormation :
 * 
 * Une méthode permettant de :
 * * Controler les données entrantes lors de la création d'une formation.
 * * Vérifier et imposer que les contraintes soient bien respectées.
 * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
 */
  @ApiBody({ type: CreateFormationDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Ajout d'une formation sur CV utilisateur" })
  async createFormation(@Body() createFormationDto: CreateFormationDto, @Request() req) {

    if (await this.formationsService.findByFormationAndUser(req.user.id, createFormationDto.diplôme)) {

      throw new HttpException("Formation déjà renseignée", HttpStatus.BAD_REQUEST);
    }

    const response = await this.formationsService.createFormation(createFormationDto, req.user);
    return {
      statusCode: 201,
      data: response,
      message: "Formation ajoutée"
    }

  }

  /** 
   * @method findAllForm :
   * 
   * Une méthode permettant de :
   * * Controler les données entrantes lors de la consultation de toutes les formations.
   * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
   */
  @ApiBody({ type: CreateFormationDto })
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Récupération de l'ensemble des formations des CV utilisateurs" })
  async findAllForm(@Request() req) {


    const allFormations = await this.formationsService.findAllFormations(req.user.id);
    console.log(allFormations);

    if (!allFormations) {
      throw new HttpException("aucune formation trouvée", HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: 200,
      data: allFormations,
      message: "Ensemble des formations de votre cv"
    }
  }

  /** 
    * @method findFormationById :
    * 
    * Une méthode permettant de :
    * * Controler les données entrantes lors de la consultation d'une formation par son Id.
    * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
    */
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({ summary: "Récupération d'une formation sur CV utilisateur par son id" })
  async findFormationById(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const formation = await this.formationsService.findFormationById(id, req.user.id);
    if (!formation) {
      throw new HttpException("cette formation n'existe pas", HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      data: formation,
      message: "Votre formation"
    }
  }

  /** 
    * @method findFormationByName :
    * 
    * Une méthode permettant de :
    * * Controler les données entrantes lors de la recherche d'une formation par son nom.
    * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
    * * Consultant uniquement
    */
  @UseGuards(JwtAuthGuard)
  @Get('specialite/:name')
  @ApiOperation({ summary: "Récupération d'une formation par son nom " })
  async findFormationByName(@Param('name') diplôme: string) {
    const formation = await this.formationsService.findFormationByName(diplôme);
    if (!formation) {
      throw new HttpException("Aucune formation trouvée", HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      message: "votre formation ",
      data: formation
    }
  }

  /** 
    * @method updateFormation :
    * 
    * Une méthode permettant de :
    * * Controler les données entrantes lors de la modification d'une formation.
    * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
    * * L'user doit être connecté pour modifier ses formations.
    */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: "Modification d'une Formation du CV utilisateur" })
  async updateFormation(@Param('id', ParseIntPipe) id: number, @Body() updateFormationDto: UpdateFormationDto, @Request() req) {
    if (await this.formationsService.findByFormationAndUser(req.user.id, updateFormationDto.diplôme)) {
      throw new HttpException("Formation déjà existante.", HttpStatus.BAD_REQUEST);
    }
    const update = await this.formationsService.update(+id, updateFormationDto);
    return {
      statusCode: 200,
      message: "votre formation a bien été modifiée",
      data: update
    }
  }

  /** 
  * @method deleteFormation :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la suppression d'une formation'.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
  * * Le développeur doit être connecté pour pouvoir supprimer sa formation.
  */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "Suppression d'une formation du CV utilisateur" })
  async deleteFormation(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const formation = await this.formationsService.findFormationById(id, req.user.id);
    if (!formation) {
      throw new HttpException("Formation introuvable.", HttpStatus.NOT_FOUND);
    }
    const response = await this.formationsService.deleteFormation(id)
    return {
      statusCode: 200,
      message: "La Formation a été supprimée",
      data: response,

    }
  }
}
