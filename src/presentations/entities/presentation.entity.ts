import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";



@Entity('presentations')
export class Presentation extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        nullable:false
    })
    name: string;

    @ApiProperty({ type: () => Presentation })
    @OneToOne(() => User, (user) => user.presentation, {onDelete: 'CASCADE'})
    user: User

}
