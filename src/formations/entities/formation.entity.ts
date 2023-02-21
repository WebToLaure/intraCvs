import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne,  } from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";


@Entity('formations')

export class Formation extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        nullable: true,
    })
    specialite: string;

    @ApiProperty()
    @Column({
        nullable: true,
    })
    diplôme: string;

    @ApiProperty()
    @Column({
        type:"date",
        nullable: true,
    })
    date_obtention: Date;
    

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.formations, { nullable: false, onDelete: 'CASCADE' })
    user: User;

}
