import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BossRaidEntity } from './boss-raid.entity';
import { HttpService } from '@nestjs/axios'; 
import { Cache } from 'cache-manager'; 

@Injectable()
export class BossRaidService {

    constructor(

        @InjectRepository(BossRaidEntity)
        private bossRaidRepository : Repository<BossRaidEntity>,

        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,

        private readonly httpService: HttpService,
    ){

        this.refreshCachingData();
    }

    private async fetchCachingData() {
        return this.httpService.axiosRef.get(
            'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json',
        );
    }

    public async refreshCachingData() {
        const data = await this.fetchCachingData();
        const staticData = data.data.bossRaids[0]; // S3 저장소에서 가져온 정적 데이터
        
        /**
         *  in Memory Caching
         */
        await this.cacheManager.set(
          'bossRaidLimitSeconds',
          staticData.bossRaidLimitSeconds,
        );
    
        await this.cacheManager.set('level_1', staticData.levels[0].score);
        await this.cacheManager.set('level_2', staticData.levels[1].score);
        await this.cacheManager.set('level_3', staticData.levels[2].score);
    
 
        console.log(await this.cacheManager.get('bossRaidLimitSeconds'));
        console.log(await this.cacheManager.get('level_1'));
        console.log(await this.cacheManager.get('level_2'));
        console.log(await this.cacheManager.get('level_3'));
    }

    async getBossRaidStatus() {

    }

    async startBossRaid(userId: number, level : number) {

    }

    async endBossRaid(userId: number, raidRecordId: number) {

        const record= await this.bossRaidRepository.findOne({
            where:{
                index: raidRecordId,
                user: { userId: userId }
            },
            relations:{
                user: true
            } 
        });
    };

    async searchBossRaidRanking(userId : number) {

    }


}
