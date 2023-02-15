import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ExperiencesController],
  providers: [ExperiencesService,UsersService ]
})
export class ExperiencesModule {}
