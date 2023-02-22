import { Module } from '@nestjs/common';
import { FonctionnellesService } from './fonctionnelles.service';
import { FonctionnellesController } from './fonctionnelles.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [FonctionnellesController],
  providers: [FonctionnellesService, UsersService]
})
export class FonctionnellesModule {}
