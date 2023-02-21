import { Module } from '@nestjs/common';
import { TechniquesService } from './techniques.service';
import { TechniquesController } from './techniques.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [TechniquesController],
  providers: [TechniquesService, UsersService]
})
export class TechniquesModule {}
