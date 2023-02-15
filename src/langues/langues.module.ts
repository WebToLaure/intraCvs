import { Module } from '@nestjs/common';
import { LanguesService } from './langues.service';
import { LanguesController } from './langues.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [LanguesController],
  providers: [LanguesService,UsersService]
})
export class LanguesModule {}
