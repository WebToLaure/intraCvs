import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, HttpException, Request, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
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
  @ApiOperation({ summary: "Ajout d'une formation sur CV utilisateur" })
  async createFormation(@Body() createFormationDto: CreateFormationDto, @Request() req) {

    if (await this.formationsService.findByFormationAndUser(req.user.userId, createFormationDto.specialite)) {

      throw new HttpException("Formation déjà renseignée", HttpStatus.NOT_ACCEPTABLE);
    }
    const user = await this.usersService.findOne(req.user.userId);
   

    return await this.formationsService.createFormation(createFormationDto, user);
  }


  @ApiBody({ type: CreateFormationDto })
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Récupération de l'ensemble des formations des CV utilisateurs" })
  async findAllForm(){

   const allFormations = await this.formationsService.findAllFormations();
   if(!allFormations){
    throw new HttpException("aucune formation trouvée", HttpStatus.BAD_REQUEST);
   }

   return allFormations;
  }


  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({ summary: "Récupération d'une formation sur CV utilisateur par son id" })
  async findFormationById(@Param('id', ParseIntPipe) id: number, @Request()req) {
    const formation = await this.formationsService.findFormationById(id,req.user.userId);
    if (!formation) {
      throw new HttpException("cette formation n'existe pas", HttpStatus.BAD_REQUEST);
    }
    return formation;
  }


  @UseGuards(JwtAuthGuard)
  @Get('specialite/:name')
  @ApiOperation({ summary: "Récupération d'une formation par son nom " })
  async findFormationByName(@Param('name') specialite: string) {
    const formation = await this.formationsService.findFormationByName(specialite);
    if (!formation) {
      throw new HttpException("Aucune formation trouvée", HttpStatus.NOT_FOUND);
    }
    return formation;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: "Modification d'une Formation du CV utilisateur" })
  async updateFormation(@Param('id') id: string, @Body() updateFormationDto: UpdateFormationDto, @Request() req) {
    if (await this.formationsService.findByFormationAndUser(req.user.userId, updateFormationDto.specialite)) {
      throw new HttpException("Formation déjà existante.", HttpStatus.NOT_ACCEPTABLE);
    }
    const update = this.formationsService.update(+id, updateFormationDto);
    
    return  {
      statusCode:200,
      message:"votre formation a bien été modifiée",
      data:update
    } 
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "Suppression d'une formation du CV utilisateur" })
  async deleteFormation(@Param('id', ParseIntPipe) id: number, @Request() req) {

    const formation = await this.formationsService.findFormationById(id, req.user.userId);

    if (!formation) {

      throw new HttpException("Formation introuvable.", HttpStatus.NOT_FOUND);
    }

    if (await this.formationsService.deleteFormation(id)) {

      throw new HttpException("Formation supprimée.", HttpStatus.OK);
    }
    throw new HttpException("Suppression impossible.", HttpStatus.BAD_REQUEST);
  }
}
