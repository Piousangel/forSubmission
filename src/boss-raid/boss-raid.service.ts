import { Injectable, CACHE_MANAGER, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BossRaidEntity, RecordType } from './boss-raid.entity';
import { HttpService } from '@nestjs/axios'; 
import { Cache } from 'cache-manager'; 
import { UserRankingService } from '../user-ranking/user-ranking.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class BossRaidService {

    constructor(

        @InjectRepository(BossRaidEntity)
        private bossRaidRepository : Repository<BossRaidEntity>,

        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,

        private httpService: HttpService,
        private userRankingService: UserRankingService,
        private userService: UsersService,
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
        
        await this.cacheManager.set(
          'bossRaidLimitSeconds',
          staticData.bossRaidLimitSeconds,
        );
    
        await this.cacheManager.set('1', staticData.levels[0].score);  
        await this.cacheManager.set('2', staticData.levels[1].score);
        await this.cacheManager.set('3', staticData.levels[2].score);
    
 
        console.log(await this.cacheManager.get('bossRaidLimitSeconds')); //180
        console.log(await this.cacheManager.get('1'));  //20
        console.log(await this.cacheManager.get('2'));  //47
        console.log(await this.cacheManager.get('3'));  //85
    }

    async getBossRaidStatus() {

    }

    //보스레이드가 시작가능하다면 시작하기
    async startBossRaid(userId: number, level : number) {

        const raidPossible = await this.bossRaidRepository.findOne({

            where:{
                canEntered : RecordType.IMPOSSIBLE
            }
        })

        // IMPOSSIBLE이 있다면 지금 보스레이드 중
        if (raidPossible) {
            return raidPossible.user
        }
        else{ // 가능하면 보스레이드 시작
            
            //여기서 점수를 올려버리자
            const score = await this.cacheManager.get(level.toString());
            
            const nowUser = await this.userService.getUserById(userId);

            const bossRaid = this.bossRaidRepository.create({
                // user : nowUser,
                level : level,
                score : Number(score),
                canEntered : RecordType.IMPOSSIBLE,
            })
        }
    }

    // 보스레이드가 종료되는 시점에 랭킹 업데이트
    async endBossRaid(userId: number, raidRecordId: number) {

        const record = await this.bossRaidRepository.findOne({
            where:{
                index: raidRecordId,
                user: { userId: userId }
            },
            relations:{
                user: true
            } 
        });

        if (!record) {
            throw new NotFoundException('해당하는 레이드 기록이 존재하지 않습니다');
        }

        await this.bossRaidRepository.save(record);
        
        await this.updateRanking(( await record.user).userId, record.score)
    };

    //랭킹 업데이트
    async updateRanking(userId: number, score: number){
        this.userRankingService.updateRanking(userId, score);
    }

    // async searchBossRaidRanking(userId : number) {

    // }


}
