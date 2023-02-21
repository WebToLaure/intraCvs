
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

import { Presentation } from "src/presentations/entities/presentation.entity";
import { Experience } from "src/experiences/entities/experience.entity";
import { Competence } from "src/competences/entities/competence.entity";
import { Formation } from "src/formations/entities/formation.entity";
import { Langue } from "src/langues/entities/langue.entity";
import { CentresInteret } from "src/centres_interets/entities/centres_interet.entity";
import { UserRoleEnum } from "src/enum/user-role.enum";

@Entity('users')
export class User extends BaseEntity {


    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        unique: true,
    })
    email: string;

    @ApiProperty()
    @Column({

        nullable:true
    })
    telephone: string;

    @ApiProperty()
    @Exclude()
    @Column({
        nullable: false,
    })
    password: string;

    @ApiProperty()
    @Column({
        length: 50,
        nullable: false
    })
    firstname: string;

    @ApiProperty()
    @Column({
        length: 50,
        nullable: false
    })
    lastname: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    poste_actuel: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    classe_professionnelle: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    ville_affectation: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    region_affectation: string;

    @ApiProperty()
    @Column({
        nullable: true,
        type: "bytea",
    })
    photo: string;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    @Exclude()
    role: UserRoleEnum;

    @ApiProperty({ type: () => Presentation })
    @OneToOne(() => Presentation, (presentation) => presentation.user, { eager: true })
    @JoinColumn() 
    presentation: Presentation;


    @ApiProperty({ type: () => Experience })
    @OneToMany(() => Experience, (experience) => experience.user, { eager: true })
    experiences: Experience[]


    @ApiProperty({ type: () => Competence })
    @OneToMany(() => Competence, (competence) => competence.user, { eager: true })
    competences: Competence[]


    @ApiProperty({ type: () => Formation })
    @OneToMany(() => Formation, (formation) => formation.user, { eager: true })
    formations: Formation[]


    @ApiProperty({ type: () => Langue })
    @OneToMany(() => Langue, (langue) => langue.user, { eager: true })
    langues: Langue[]


    @ApiProperty({ type: () => CentresInteret })
    @OneToMany(() => CentresInteret, (centres_interet) => centres_interet.user, { eager: true })
    centres_interets: CentresInteret[]

}