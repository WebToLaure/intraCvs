import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors, UseGuards, Request, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CentresInteretsService } from './centres_interets.service';
import { CreateCentresInteretDto } from './dto/create-centres_interet.dto';
import { UpdateCentresInteretDto } from './dto/update-centres_interet.dto';
import { UsersService } from 'src/users/users.service';


@ApiTags("INTERETS")
@Controller('Interets')
@UseInterceptors(ClassSerializerInterceptor)
export class CentresInteretsController {
  constructor(private readonly centresInteretsService: CentresInteretsService,
    private readonly usersService: UsersService) { }


  @ApiBody({ type: CreateCentresInteretDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Ajout d'un centre d'intérêt sur compte utilisateur" })
  async createInteret(@Body() createCentresInteretDto: CreateCentresInteretDto, @Request() req) {
    if (await this.centresInteretsService.findInteretAndUser(req.user.userId, createCentresInteretDto.intitule)) {
      throw new HttpException("Intérêt déjà renseigné", HttpStatus.NOT_ACCEPTABLE);
    }
    const user = await this.usersService.findOne(req.user.userId);

    return await this.centresInteretsService.createInteret(createCentresInteretDto, user);
  }

  @ApiBody({ type: CreateCentresInteretDto })
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Récupération de l'ensemble des Interets utilisateur" })

  async findAllInterets() {
    return await this.centresInteretsService.findAllInterets();
  }



  @Get(':id')
  @ApiOperation({ summary: "Récupération d'un Interet utilisateur par son id" })
  async findInteretById(@Param('id', ParseIntPipe) id: number) {
    const Interet = await this.centresInteretsService.findInteretById(id);
    return await this.centresInteretsService.findInteretById(+id);
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: "Modification d'un Centre d'Intérêt " })
  async updateInteret(@Param('id') id: string, @Body() updateCentresIneteretDto: UpdateCentresInteretDto, @Request() req) {
    if (await this.centresInteretsService.findInteretAndUser(req.user.userId, updateCentresIneteretDto.intitule)) {
      throw new HttpException("Intérêt déjà existant.", HttpStatus.NOT_ACCEPTABLE);
    }
    const update = await this.centresInteretsService.updateInteret(+id, updateCentresIneteretDto);
    
    return  {
      statusCode:200,
      message:"votre centre d'intérêt a bien été modifié",
      data:update
    } 
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "Suppression d'un Centre d'intérêt" })
  async deleteInteret(@Param('id', ParseIntPipe) id: number, @Request() req) {

    const Interet = await this.centresInteretsService.findInteretById(id);

    if (!Interet) {

      throw new HttpException("Intérêt introuvable.", HttpStatus.NOT_FOUND);
    }

    if (await this.centresInteretsService.deleteInteret(id)) {

      throw new HttpException("Intérêt supprimée.", HttpStatus.OK);
    }
    throw new HttpException("Suppression impossible.", HttpStatus.BAD_REQUEST);
  }
  }

