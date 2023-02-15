import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CentresInteretsService } from './centres_interets.service';
import { CreateCentresInteretDto } from './dto/create-centres_interet.dto';
import { UpdateCentresInteretDto } from './dto/update-centres_interet.dto';
import { UsersService } from 'src/users/users.service';

@Controller('centres-interets')
export class CentresInteretsController {
  constructor(private readonly centresInteretsService: CentresInteretsService,
    private readonly usersService: UsersService ) {}

  @Post()
  create(@Body() createCentresInteretDto: CreateCentresInteretDto) {
    return this.centresInteretsService.create(createCentresInteretDto);
  }

  @Get()
  findAll() {
    return this.centresInteretsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centresInteretsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCentresInteretDto: UpdateCentresInteretDto) {
    return this.centresInteretsService.update(+id, updateCentresInteretDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centresInteretsService.remove(+id);
  }
}
