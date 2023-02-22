import { Module } from '@nestjs/common';
import { FonctionnellesService } from './fonctionnelles.service';
import { FonctionnellesController } from './fonctionnelles.controller';

@Module({
  controllers: [FonctionnellesController],
  providers: [FonctionnellesService]
})
export class FonctionnellesModule {}
