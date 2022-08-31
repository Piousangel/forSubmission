import { Body, CacheInterceptor, Controller, Get, Patch, Post, UseInterceptors } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { BossRaidEntity } from './boss-raid.entity';
import { BossRaidService } from './boss-raid.service';
import moment from 'moment';
import { ApiOperation } from '@nestjs/swagger';

@Controller('boss-raid')
@UseInterceptors(CacheInterceptor)
export class BossRaidController {

    constructor(private bossraidService: BossRaidService){}

    @ApiOperation({ summary: '보스레이드상태 조회 (입장가능한지 혹은 현재 진행중인 유저가 있다면, 해당 유저의 id반환'}) 
    @Get('/')
    async getBossRaidStatus() {
        
        const arr = await this.bossraidService.getBossRaidStatus();

        return {"isEntered" : arr[0], "raidRecordId" : arr[1]}
    }

    @ApiOperation({ summary: '서비스단에서 조회 가능한지 따져서 가능하면 보스레이드 하기'})
    @Post('/enter')
    async startBossRaid( @Body() body) {

        return await this.bossraidService.startBossRaid(body.userId, body.level);
    }

    @ApiOperation({ summary: '보스레이드 종료하기 레이드 level에 따라 score 반영 (level은 0: 20, 1: 47, 2 : 85)'}) 
    @Patch('/end')
    async endBossRaid( @Body() body) {

        const result = await this.bossraidService.endBossRaid(body.userId, body.raidRecordId);
        return {"isEntered" : result, "comment" : "레이드 종료, 랭킹 업데이트"}
    }

    @ApiOperation({ summary: '보스레이드 랭킹 조회 응답으로 전체 순위 리스트, id -> ranking'})
    @Post('/topRankerList')
    async searchBossRaidRanking( @Body() body) {

        return await this.bossraidService.searchBossRaidRanking(body.userId);
    }
    
    

}
