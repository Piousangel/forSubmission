import { BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "src/users/users.entity";

@Entity()
export class BossRaidEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    index : number;

    //유저 아이디와 조인시켜줄 것 
    @ManyToOne(() => User, (user)=> user.raidRecords , {lazy : true})
    user : Promise<User>;

    //레이드 참여 여부
    @Column()
    canEntered: boolean;

    //레이드 시작 시간
    @CreateDateColumn({ type: 'timestamp' })
    Raid_startTime: Date;

    @Column({ type: 'timestamp'})
    endTime: Date;

}