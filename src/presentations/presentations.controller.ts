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

    if (user.presentation) {
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

    const userId = req.user.userId // permet de récupérer l'id de l'user
    const user = await this.usersService.findOne(userId); // permet de récuperer l'intégralité de la composition de l'user

    if (user.presentation == null) { // condition permettant de savoir si la présentation de l'user est null ou si elle existe
      throw new HttpException("Impossible veuillez d'abord créer une présentation", HttpStatus.FORBIDDEN)
    }

    // const permettant de controller et d'injecter l'id de la présentation de l'user connecté et d'update les data
    const updatePresentation = await this.presentationsService.updatePresentation(user.presentation.id, updatePresentationDto);

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

    const userLog = req.user.userId
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

