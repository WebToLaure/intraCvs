import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';




@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5000000s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy,UsersService],
  exports: [AuthService],
})
export class AuthModule { }