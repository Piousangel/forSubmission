import { BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
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
    user : User;

    //점수 -> 이것도 유저에서 가져오는 방식으로 하면 좋겠다..
    
    // @OneToOne(() => User, (user) => user.score)
    // @JoinColumn()
    @Column()
    score : number;

    // 레벨 필요 없을 것 같긴합니다.
    @Column()
    level : number;

    //레이드 참여 여부
    @Column({ type: 'enum', enum : RecordType})
    isEntered: RecordType;

    //레이드 시작 시간
    @CreateDateColumn({ type: 'timestamp' })
    Raid_startTime: Date;

    //끝나는 시간
    @Column({ type: 'timestamp', nullable: true})
    endTime: Date;

    isBossRaidFinshed() {
        return(
            this.isEntered === RecordType.POSSIBLE|| this.isEntered === RecordType.IMPOSSIBLE
        );
    }

    isTimeout(now: Moment) {
        return now.isAfter(moment(this.endTime));
    }

    isFinshed(now: Moment) {
        this.isEntered = RecordType.FINSHED;
        this.endTime = now.toDate();
    }

}

