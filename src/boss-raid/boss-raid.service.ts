import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BossRaidEntity } from './boss-raid.entity';

@Injectable()
export class BossRaidService {

    constructor(

        @InjectRepository(BossRaidEntity)
        private bossRaidRepository : Repository<BossRaidEntity>,
    ){}

    async getBossRaidStatus() : Promise<BossRaidEntity> {

    }

    async startBossRaid(userId: number, level : number) : Promise<BossRaidEntity> {

    }

    async endBossRaid(userId: number, raidRecordId: number) : Promise<BossRaidEntity> {

    }

    async searchBossRaidRanking(userId : number) : Promise<BossRaidEntity> {
        
    }
}
