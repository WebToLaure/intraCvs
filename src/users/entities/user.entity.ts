
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";




@Entity('users')
export class User extends BaseEntity {


    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Exclude()
    @Column({
        unique: true,
    })
    email: string;

    @ApiProperty()
    @Exclude()
    @Column({
        nullable: false,
    })
    password: string;

    @ApiProperty()
    @Exclude()
    @Column({
        length: 50,
        nullable: false
    })
    firstname: string;

    @ApiProperty()
    @Exclude()
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
    lieu_affectation: string;

    @ApiProperty()
    @Column({
        nullable: true,
        type:"bytea",
    })
    photo: string;

    @ApiProperty()
    @Column({
        nullable:true,
    })
    presentation:string






}