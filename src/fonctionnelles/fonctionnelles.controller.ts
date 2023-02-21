import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FonctionnellesService } from './fonctionnelles.service';
import { CreateFonctionnelleDto } from './dto/create-fonctionnelle.dto';
import { UpdateFonctionnelleDto } from './dto/update-fonctionnelle.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('FONCTIONNELLES')
@Controller('fonctionnelles')
export class FonctionnellesController {
  constructor(private readonly fonctionnellesService: FonctionnellesService) {}

  @Post()
  create(@Body() createFonctionnelleDto: CreateFonctionnelleDto) {
    return this.fonctionnellesService.create(createFonctionnelleDto);
  }

  @Get()
  findAll() {
    return this.fonctionnellesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fonctionnellesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFonctionnelleDto: UpdateFonctionnelleDto) {
    return this.fonctionnellesService.update(+id, updateFonctionnelleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fonctionnellesService.remove(+id);
  }
}
