import { Module } from '@nestjs/common';
import { TechniquesService } from './techniques.service';
import { TechniquesController } from './techniques.controller';

@Module({
  controllers: [TechniquesController],
  providers: [TechniquesService]
})
export class TechniquesModule {}
