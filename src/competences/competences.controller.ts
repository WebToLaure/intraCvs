import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { UsersService } from 'src/users/users.service';
import { ApiTags, ApiBody,ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Competence } from './entities/competence.entity';


@ApiTags('COMPETENCES')
@Controller('competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService,
    private readonly usersService: UsersService) { }
  @ApiBody({ type: CreateCompetenceDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Ajout d'une compétence sur CV utilisateur" })
  async createCompetence(@Body() createCompetenceDto: CreateCompetenceDto, @Request()req) {
    const user = req.user.userId;
    const competence = await this.competencesService.findCompetenceAndUser(req.user.userId, createCompetenceDto.technique);
 

    return this.competencesService.create(createCompetenceDto,user);
  }

  @Get()
  findAll() {
    return this.competencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetenceDto: UpdateCompetenceDto) {
    return this.competencesService.update(+id, updateCompetenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competencesService.remove(+id);
  }
}
