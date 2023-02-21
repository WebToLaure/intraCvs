import { Module } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { FormationsController } from './formations.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [FormationsController],
  providers: [FormationsService, UsersService,]
})
export class FormationsModule { }
