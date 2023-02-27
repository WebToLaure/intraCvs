import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { TechniquesService } from './techniques.service';
import { CreateTechniqueDto } from './dto/create-technique.dto';
import { UpdateTechniqueDto } from './dto/update-technique.dto';
import { UsersService } from 'src/users/users.service';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

/**@class TechniquesController
* 
* * Méthode chargée d'invoquer le service compétences.
* * Contrôle des requêtes entrantes , Vérification avant envoi en base de données, invoque le service.
* * Création, Recherche via certains critères, Modifification des données , Suppression d'une compétence.
*/

@ApiTags('TECHNIQUES')
@Controller('techniques')
export class TechniquesController {
  constructor(private readonly techniquesService: TechniquesService,
    private readonly usersService: UsersService) { }

  /** 
    * @method createCompTech:
    * * Contrôle des données sur la création  d'une compétence sur CV utilisateur.
    * * Envoi d'un message correspondant au résultat de la requête.
  */
  @ApiBody({ type: CreateTechniqueDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Ajout d'une compétence technique sur CV utilisateur" })
  async createCompTech(@Body() createTechniqueDto: CreateTechniqueDto, @Request() req) {

    if (await this.techniquesService.findCompTechAndUser(req.user.id, createTechniqueDto.libelle)) {

      throw new HttpException("Cette compétence technique existe déjà.", HttpStatus.BAD_REQUEST);
    }

    return await this.techniquesService.createCompTech(createTechniqueDto, req.user);
  }

  /** 
    * @method findAllCompTech:
    * * Contrôle des données sur la recherche de toutes les compétences techniques CV utilisateurs.
    * * Envoi d'un message correspondant au résultat de la requête.
    */
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Recherche des compétences techniques sur CV utilisateurs" })
  async findAllCompTech() {
    return await this.techniquesService.findAllCompTech();
  }

  /** 
  * @method findCompTechById:
  * * Contrôle des données sur la recherche d'une compétence technique par l'id sur CV utilisateurs.
  * * Envoi d'un message correspondant au résultat de la requête.
  */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: "Recherche d'une compétence technique sur CV par id" })
  findCompTechById(@Param('id', ParseIntPipe) id: number) {
    return this.techniquesService.findCompTechById(id);
  }

  /** 
  * @method updateCompTech:
  * * Contrôle des données sur la modification d'une compétence technique sur CV utilisateur.
  * * Envoi d'un message correspondant au résultat de la requête.
  */
  @ApiBody({ type: UpdateTechniqueDto })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: "Modification d'une compétence technique sur CV utilisateur" })
  async updateCompTech(@Param('id', ParseIntPipe) id: number, @Body() updateTechniqueDto: UpdateTechniqueDto, @Request() req) {
    const competenceTech = await this.techniquesService.findCompTechById(id);
    if (!competenceTech) {
      throw new HttpException("Compétence technique introuvable.", HttpStatus.NOT_FOUND);
    }
    if (await this.techniquesService.findCompTechAndUser(req.user.id, updateTechniqueDto.libelle)) {
      throw new HttpException("Compétence technique déjà existante.", HttpStatus.BAD_REQUEST);
    }
    const update = await this.techniquesService.updateCompTech(id, updateTechniqueDto);
    return {
      statusCode: 200,
      message: "Votre compétence technique a été mise à jour",
      data: update
    }
  }

  /** 
  * @method deleteCompTech:
  * * Contrôle des données sur la suppression d'une compétence technique sur CV utilisateur.
  * * Envoi d'un message correspondant au résultat de la requête.
  */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "Suppression d'une compétence technique sur CV utilisateur" })
  async deleteCompTech(@Param('id', ParseIntPipe) id: number, @Request() req) {

    const competence = await this.techniquesService.findCompTechById(id);

    if (await this.techniquesService.deleteCompTech(id)) {

      throw new HttpException("Compétence technique supprimée.", HttpStatus.OK);
    }
    throw new HttpException("Suppression impossible.", HttpStatus.BAD_REQUEST);
  }

}
