import { BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from "typeorm";
import { BossRaidEntity } from "src/boss-raid/boss-raid.entity";


@Entity()
export class User extends BaseEntity{

    @PrimaryColumn()
    userId: number;

    @Column()
    totalScore: number;

    @Column()
    isEntered: boolean;

    //1:N 유저 하나당 여러개의 레이드 기록
    @OneToMany( () => BossRaidEntity, (record)=> record.user)
    raidRecords : BossRaidEntity[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}