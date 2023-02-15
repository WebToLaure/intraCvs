
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

@Entity('centres_interets')

export class CentresInteret extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Exclude()
    @Column({
        nullable: true,
    })
    intitulé: string;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.centres_interets, { nullable: false, onDelete: 'CASCADE' })
    user: User;

}
