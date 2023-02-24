import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";



@Entity('experiences')
export class Experience extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        nullable: true,
    })
    intitulé_poste: string;


    @ApiProperty()
    @Column({
        nullable: true,
    })
    entreprise: string;

    @ApiProperty()
    @Column({
        nullable: true,
    })
    lieu: string;


    @ApiProperty()
    @Column({
        type:"date",
        nullable: true
    })
    date_début: Date;

    @ApiProperty()
    @Column({  
        type:"date",
        nullable: true
    })
    date_fin: Date;


    @ApiProperty()
    @Exclude()
    @Column({
        nullable: true,
    })
    descriptif: string

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.experiences, { nullable: false, onDelete: 'CASCADE' })
    user: User;

}
