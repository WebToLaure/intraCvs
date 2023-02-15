import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LanguesService } from './langues.service';
import { CreateLangueDto } from './dto/create-langue.dto';
import { UpdateLangueDto } from './dto/update-langue.dto';
import { UsersService } from 'src/users/users.service';

@Controller('langues')
export class LanguesController {
  constructor(private readonly languesService: LanguesService,
    private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createLangueDto: CreateLangueDto) {
    return this.languesService.create(createLangueDto);
  }

  @Get()
  findAll() {
    return this.languesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLangueDto: UpdateLangueDto) {
    return this.languesService.update(+id, updateLangueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languesService.remove(+id);
  }
}
