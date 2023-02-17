import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus,ParseIntPipe, HttpException, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { FormationsService } from './formations.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags("FORMATIONS")
@Controller('formations')
export class FormationsController {
  constructor(private readonly formationsService: FormationsService,
    private readonly usersService: UsersService) { }

  @ApiBody({ type: CreateFormationDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Création d'une formation sur compte utilisateur" })
  async createFormation(@Body() createFormationDto: CreateFormationDto, @Request() req) {

    if (await this.formationsService.findByFormationAndUser(req.user.userId, createFormationDto.formation)) {
      throw new HttpException("Formation déjà renseignée", HttpStatus.NOT_ACCEPTABLE);
    }
    const user = await this.usersService.findUserById(req.user.userId) 
    return await this.formationsService.createFormation(createFormationDto, user);
  }


  @ApiBody({ type:CreateFormationDto })
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Récupération de l'ensemble des formations utilisateurs" })
  async findAllForm() {
    return await this.formationsService.findAllFormations();
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: "Récupération d'une formation utilisateur par son id" })
  async findFormationById(@Param('id', ParseIntPipe) id: number) {
    const formation = await this.formationsService.findFormationById(id);
    if (!formation) {
      throw new HttpException("cette formation n'existe pas", HttpStatus.BAD_REQUEST);
    }
    return formation;
  }


  @UseGuards(JwtAuthGuard)
  @Get('formations/:name')
  async findFormationByName(@Param('name') name: string, @Request() req) {
    const formation = await this.formationsService.findFormationByName(name);
    if (!formation) {
      throw new HttpException("Aucune formation trouvée", HttpStatus.NOT_FOUND);
    }
    return await this.formationsService.findByFormationAndUser(req.user.userId, req.user.formation);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormationDto: UpdateFormationDto) {
    return this.formationsService.update(+id, updateFormationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "Suppression d'une formation" })
  async deleteFormation(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const formation= await this.formationsService.findFormationById(id);

    if (!formation) {

      throw new HttpException("Formation introuvable.", HttpStatus.NOT_FOUND);
    }

    if (req.user.userId !== formation.user.id) {

      throw new HttpException(" Non autorisé.", HttpStatus.FORBIDDEN);
    }
    if (await this.formationsService.deleteFormation(id)) {

      throw new HttpException("Formation supprimée.", HttpStatus.OK);
    }
    throw new HttpException("Suppression impossible.", HttpStatus.BAD_REQUEST);
  }
}
