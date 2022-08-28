import { BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../users/users.entity"; 

import moment, { Moment } from "moment";

export enum RecordType {
    POSSIBLE = "POSSIBLE",
    IMPOSSIBLE = "IMPOSSIBLE",
    FINSHED = "FINSHED",  
}

@Entity()
export class BossRaidEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    index : number;

    //유저 아이디와 조인시켜줄 것 
    @ManyToOne( () => User, (user)=> user.raidRecords , {lazy : true})
    user : Promise<User>;

    //점수
    @Column()
    score : number;

    @Column()
    level : number;

    //레이드 참여 여부
    @Column({ type: 'enum', enum : RecordType})
    canEntered: RecordType;

    //레이드 시작 시간
    @CreateDateColumn({ type: 'timestamp' })
    Raid_startTime: Date;

    //끝나는 시간
    @Column({ type: 'timestamp'})
    endTime: Date;

    isBossRaidFinshed() {
        return(
            this.canEntered === RecordType.POSSIBLE|| this.canEntered === RecordType.IMPOSSIBLE
        );
    }

    isTimeout(now: Moment) {
        return now.isAfter(moment(this.endTime));
    }

    isFinshed(now: Moment) {
        this.canEntered = RecordType.FINSHED;
        this.endTime = now.toDate();
    }

}

