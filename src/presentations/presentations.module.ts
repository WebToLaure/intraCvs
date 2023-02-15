import { Module } from '@nestjs/common';
import { PresentationsService } from './presentations.service';
import { PresentationsController } from './presentations.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [PresentationsController],
  providers: [PresentationsService,UsersService ]
})
export class PresentationsModule {}
