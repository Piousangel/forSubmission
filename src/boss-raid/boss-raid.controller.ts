import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { BossRaidEntity } from './boss-raid.entity';
import { BossRaidService } from './boss-raid.service';
import moment from 'moment';

@Controller('boss-raid')
export class BossRaidController {

    constructor(private bossraidService: BossRaidService){}

    // 보스레이드상태 조회 (입장가능한지 혹은 현재 진행중인 유저가 있다면, 해당 유저의 id)
    @Get('/')
    async getBossRaidStatus() {
        
        return await this.bossraidService.getBossRaidStatus();
    }

    // 서비스단에서 조회 가능한지 따져서 가능하면 보스레이드 하기
    @Post('/enter')
    async startBossRaid( @Body() body) {

        return await this.bossraidService.startBossRaid(body.userId, body.level);
    }

    // 보스레이드 종료하기 레이드 level에 따라 score 반영 (level은 0: 20, 1: 47, 2 : 85)
    @Patch('/end')
    async endBossRaid( @Body() body) {

        return await this.bossraidService.endBossRaid(body.userId, body.raidRecordId);
    }

    // @Get('/topRankerList')
    // async searchBossRaidRanking( @Body() body): Promise<BossRaidEntity>{

    //     return await this.bossraidService.searchBossRaidRanking(body.userId);
    // }

}
