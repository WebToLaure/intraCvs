import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { UsersService } from 'src/users/users.service';

@Controller('formations')
export class FormationsController {
  constructor(private readonly formationsService: FormationsService,
    private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createFormationDto: CreateFormationDto) {
    return this.formationsService.create(createFormationDto);
  }

  @Get()
  findAll() {
    return this.formationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormationDto: UpdateFormationDto) {
    return this.formationsService.update(+id, updateFormationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formationsService.remove(+id);
  }
}
