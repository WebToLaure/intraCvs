import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";


@ApiTags('FONCTIONNELLES')
@Entity('fonctionnelles')
export class Fonctionnelle extends BaseEntity{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        nullable: true,
    })
    libelle: string;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.fonctionnelles, { nullable: false, onDelete: 'CASCADE' })
    user: User;

}




