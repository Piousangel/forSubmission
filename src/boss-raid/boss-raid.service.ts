import { Injectable, CACHE_MANAGER, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BossRaidEntity, RecordType } from './boss-raid.entity';
import { HttpService } from '@nestjs/axios'; 
import { Cache } from 'cache-manager'; 
import { UserRankingService } from '../user-ranking/user-ranking.service';
import { UsersService } from '../users/users.service';
// import { v4 as uuidv } from 'uuid';

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
        this.takeCacheData();  //즉시 호출하게 끔
    }

    private async getData() {
        return this.httpService.axiosRef.get(
            'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json',
        );
    }

    public async takeCacheData() {
        const data = await this.getData();
        const staticData = data.data.bossRaids[0]; // S3 저장소에서 가져온 정적 데이터
        
        await this.cacheManager.set('bossRaidLimitSeconds',staticData.bossRaidLimitSeconds);
    
        await this.cacheManager.set('1', staticData.levels[0].score);  
        await this.cacheManager.set('2', staticData.levels[1].score);
        await this.cacheManager.set('3', staticData.levels[2].score);

        //console.log("123123", await this.cacheManager.get('bossRaidLimitSeconds')); //180

    }

    async getBossRaidStatus() {

        const raidPossible = await this.bossRaidRepository.findOne({

            where:{
                isEntered : RecordType.IMPOSSIBLE
            }
        })

        // IMPOSSIBLE이 있다면 지금 보스레이드 중입니다.
        //console.log("raidPossible.user!!!!!", raidPossible.index)
        if (raidPossible) {
            return [RecordType.IMPOSSIBLE, raidPossible.index]
        }
        else{
            return RecordType.POSSIBLE
        }

    }

    //보스레이드가 시작가능하다면 시작하기
    async startBossRaid(userId: number, level : number) {

        
        // 가능하면 보스레이드 시작( 중복되지 않는 raidRecordID를 true 와 함께 응답?!)
        const getStatus = await this.getBossRaidStatus();

        if (getStatus == "POSSIBLE"){
            //여기서 점수를 올려버리자
            const score = await this.cacheManager.get(level.toString());
            console.log("level@@@@@@", level.toString());
            console.log("score!!!!!!", score);
            const nowUser = await this.userService.getUserById(userId);

            const bossRaid = this.bossRaidRepository.create({
                user : nowUser,
                level : level,
                score : Number(score),
                isEntered : RecordType.IMPOSSIBLE,
            })

            await this.bossRaidRepository.save(bossRaid);
            return bossRaid;
        }
        else{
            return getStatus;
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
        record.isEntered = RecordType.POSSIBLE
        await this.bossRaidRepository.save(record);
        await this.updateRanking( (await record.user).userId, record.score)
        return record.isEntered
    };

    //랭킹 업데이트
    async updateRanking(userId: number, score: number){
        this.userRankingService.updateRanking(userId, score);
    }

    //랭킹 조회
    async searchBossRaidRanking(userId : number) {
        return this.userRankingService.searchRanking(userId);
    }


}
