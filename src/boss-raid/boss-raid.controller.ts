import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { BossRaidEntity } from './boss-raid.entity';
import { BossRaidService } from './boss-raid.service';

@Controller('boss-raid')
export class BossRaidController {

    constructor(private bossraidService: BossRaidService){}

    @Get('/bossRaid')
    async getBossRaidStatus(): Promise<BossRaidEntity>{
        
        return await this.bossraidService.getBossRaidStatus();
    }

    @Post('/bossRaid/enter')
    async startBossRaid( @Body() body) : Promise<BossRaidEntity>{

        return await this.bossraidService.startBossRaid(body.userId, body.level);
    }

    @Patch('/bossRaid/end')
    async endBossRaid( @Body() body): Promise<BossRaidEntity>{

        return await this.bossraidService.endBossRaid(body.userId, body.raidRecordId);
    }

    @Get('/topRankerList')
    async searchBossRaidRanking( @Body() body): Promise<BossRaidEntity>{

        return await this.bossraidService.searchBossRaidRanking(body.userId);
    }

}
