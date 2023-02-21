import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor, BadRequestException } from '@nestjs/common';
import { PresentationsService } from './presentations.service';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('presentations')
export class PresentationsController {
  constructor(private readonly presentationsService: PresentationsService,
    private readonly usersService: UsersService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPresentationDto: CreatePresentationDto, @Req() req) {

    const userLog = req.user.userId
    const user = await this.usersService.findOne(userLog);

    if (user.presentation){
      throw new HttpException("Impossible vous avez déjà une présentation", HttpStatus.FORBIDDEN)
    }

    const createdPresentation = await this.presentationsService.createPresentation(user, createPresentationDto);

    return {
      statusCode: 201,
      data: createdPresentation,
      message: "Présentation créée"
    }

  }

  @Get()
  async findAll() {
    const presentationExist = await this.presentationsService.findAllPresentation();

    if (!presentationExist) {
      throw new HttpException("Aucune présentations n'existe", HttpStatus.NOT_FOUND);
    }

    return presentationExist;

  }

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

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updatePresentation(@Body() updatePresentationDto: UpdatePresentationDto, @Req() req) {

    const user = req.user.userId
    console.log(user);
    
        
  if (!user.presentation){
      throw new HttpException("Impossible veuillez d'abord créer une présentation", HttpStatus.FORBIDDEN)
    } 
    console.log(user.presentation)
    const updatePresentation = await this.presentationsService.updatePresentation(user, updatePresentationDto);

    return {
      statusCode: 201,
      message: 'La modification de la présentation a bien été prise en compte',
      data: {
        updatePresentation,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deletedPresentation(@Req() req) {

    const userLog = req.user.userId

    const user = await this.usersService.findOne(userLog);

    // check user presentation

    // prez existe, on la recup via son id

    //const presentationExist = await this.presentationsService.findPresentationById(user.presentation)
    /* console.log(presentationExist);
    if (!presentationExist){
      throw new HttpException("Impossible vous n'avez pas de présentation", HttpStatus.FORBIDDEN)
    } */

    //const deleted = await this.presentationsService.deletePresentation(presentationExist);
    /* console.log(deleted);
    if (!deleted) {
      throw new HttpException('Erreur Server', HttpStatus.INTERNAL_SERVER_ERROR);
    } */

    return { message: `La présentation a bien été supprimée` };
  }
}
