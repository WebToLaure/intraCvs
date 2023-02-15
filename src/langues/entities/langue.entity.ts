import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";


@Entity('langues')
export class Langue extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Exclude()
    @Column({
        nullable: true,
    })
    langue: string;

    @ApiProperty()
    @Exclude()
    @Column({
        nullable: true,
    })
    niveau: string;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.langues, { nullable: false, onDelete: 'CASCADE' })
    user: User;

}
