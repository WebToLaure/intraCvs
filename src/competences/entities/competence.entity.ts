import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";


@Entity('competences')
export class Competence extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Exclude()
    @Column({
        nullable: true,
    })
    technique: string;

    @ApiProperty()
    @Exclude()
    @Column({
        nullable: true,
    })
    fonctionnelle: string;

    @ApiProperty()
    @Exclude()
    @Column({
        nullable: true,
    })
    competences_clés: string;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.competences, { nullable: false, onDelete: 'CASCADE' })
    user: User;




}
