import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";



@Entity('presentations')
export class Presentation extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        nullable: true,
    })
    name: string;

    @ApiProperty({ type: () => Presentation })
    @OneToOne(() => User, (user) => user.presentation)
    user: User

}
