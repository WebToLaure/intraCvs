import { Module } from '@nestjs/common';
import { CentresInteretsService } from './centres_interets.service';
import { CentresInteretsController } from './centres_interets.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [CentresInteretsController],
  providers: [CentresInteretsService,UsersService]
})
export class CentresInteretsModule {}
