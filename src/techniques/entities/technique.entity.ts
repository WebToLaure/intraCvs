import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";





@Entity('techniques')
export class Technique extends BaseEntity{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        nullable: true,
    })
    libelle: string;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.techniques, { nullable: false, onDelete: 'CASCADE' })
    user: User;

}
