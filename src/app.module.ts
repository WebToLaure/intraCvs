import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

import { PresentationsModule } from './presentations/presentations.module';
import { Presentation } from './presentations/entities/presentation.entity';

import { ExperiencesModule } from './experiences/experiences.module';
import { Experience } from './experiences/entities/experience.entity';

import { FormationsModule } from './formations/formations.module';
import { Formation } from './formations/entities/formation.entity';

import { CompetencesModule } from './competences/competences.module';
import { Competence } from './competences/entities/competence.entity';

import { LanguesModule } from './langues/langues.module';
import { Langue } from './langues/entities/langue.entity';

import { CentresInteretsModule } from './centres_interets/centres_interets.module';
import { CentresInteret } from './centres_interets/entities/centres_interet.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User,Presentation,Experience,Formation, Competence,Langue,CentresInteret],
      synchronize: true,
      logging: true
    }),
    AuthModule,
    UsersModule,
    PresentationsModule,
    ExperiencesModule,
    FormationsModule,
    CompetencesModule,
    LanguesModule,
    CentresInteretsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})export class AppModule { constructor(private datasource: DataSource) { } }