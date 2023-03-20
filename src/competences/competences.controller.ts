import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { UsersService } from 'src/users/users.service';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

/**@class CompétencesController
 *
 * * Méthode chargée d'invoquer le service compétences.
 * * Contrôle des requêtes entrantes , Vérification avant envoi en base de données, invoque le service.
 * * Création, Recherche via certains critères, Modifification des données , Suppression d'une compétence.
 */

@ApiTags('AUTRES COMPETENCES')
@Controller('competences')
export class CompetencesController {
  constructor(
    private readonly competencesService: CompetencesService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * @method createComp:
   * * Contrôle des données sur la création  d'une compétence sur CV utilisateur.
   * * Envoi d'un message correspondant au résultat de la requête.
   */
  @ApiBody({ type: CreateCompetenceDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Ajout d'une compétence_clé sur CV utilisateur" })
  async createComp(
    @Body() createCompetenceDto: CreateCompetenceDto,
    @Request() req,
  ) {
    if (
      await this.competencesService.findCompetenceAndUser(
        req.user.id,
        createCompetenceDto.competence_clé,
      )
    ) {
      throw new HttpException(
        'Cette compétence existe déjà.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.competencesService.createComp(
      createCompetenceDto,
      req.user,
    );
  }

  /**
   * @method findAllComp:
   * * Contrôle des données sur la recherche de toutes les compétences CV utilisateurs.
   * * Envoi d'un message correspondant au résultat de la requête.
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Recherche des compétences_clés sur CV utilisateurs',
  })
  async findAllComp() {
    return await this.competencesService.findAllCompetences();
  }

  /**
   * @method findCompetenceById:
   * * Contrôle des données sur la recherche d'une compétence par l'id sur CV utilisateurs.
   * * Envoi d'un message correspondant au résultat de la requête.
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: "Recherche d'une compétence_clé sur CV par id" })
  findCompetenceById(@Param('id', ParseIntPipe) id: number) {
    return this.competencesService.findCompetenceById(id);
  }

  /**
   * @method updateComp:
   * * Contrôle des données sur la modification d'une compétence sur CV utilisateur.
   * * Envoi d'un message correspondant au résultat de la requête.
   */
  @ApiBody({ type: UpdateCompetenceDto })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: "Modification d'une compétence_clé sur CV utilisateur",
  })
  async updateComp(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompetenceDto: UpdateCompetenceDto,
    @Request() req,
  ) {
    const competence = await this.competencesService.findCompetenceById(id);
    if (!competence) {
      throw new HttpException('Compétence introuvable.', HttpStatus.NOT_FOUND);
    }
    if (
      await this.competencesService.findCompetenceAndUser(
        req.user.id,
        updateCompetenceDto.competence_clé,
      )
    ) {
      throw new HttpException(
        'Compétence déjà existante.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const update = await this.competencesService.updateComp(
      id,
      updateCompetenceDto,
    );
    return {
      statusCode: 200,
      message: 'Votre compétence a été mise à jour',
      data: update,
    };
  }

  /**
   * @method deleteComp:
   * * Contrôle des données sur la suppression d'une compétence sur CV utilisateur.
   * * Envoi d'un message correspondant au résultat de la requête.
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: "Suppression d'une compétence_clé sur CV utilisateur",
  })
  async deleteComp(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const competence = await this.competencesService.findCompetenceById(id);

    if (!competence) {
      throw new HttpException('Competence introuvable.', HttpStatus.NOT_FOUND);
    }

    if (await this.competencesService.deleteComp(id)) {
      throw new HttpException('Compétence supprimée.', HttpStatus.OK);
    }
    throw new HttpException('Suppression impossible.', HttpStatus.BAD_REQUEST);
  }
}
