import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
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
  async create(@Body()createPresentationDto: CreatePresentationDto, @Req() req) {

    const userLog = req.user.id
    const userExist = await this.usersService.findOne(userLog);

    if (!userExist) {
      throw new HttpException("Veuillez vous logger", HttpStatus.FORBIDDEN)
    };

    const createdPresentation = await this.presentationsService.createPresentation(userExist, createPresentationDto);

    return {
      statusCode: 201,
      data: createdPresentation,
      message: "Compétence créée"
    }

  }

  @Get()
  async findAll() {
    const presentationExist = await this.presentationsService.findAllPresentation();

    if (!presentationExist) {
      throw new HttpException("L'utilisateur n'existe pas", HttpStatus.NOT_FOUND);
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



  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePresentationDto: UpdatePresentationDto) {
    return this.presentationsService.update(+id, updatePresentationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presentationsService.remove(+id);


  }
}
