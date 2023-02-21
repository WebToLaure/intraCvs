import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";


@Entity('competences')
export class Competence extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        nullable: true,
    })
    competence_clé: string;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.competences, { nullable: false, onDelete: 'CASCADE' })
    user: User;


}
