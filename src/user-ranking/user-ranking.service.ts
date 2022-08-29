import { Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class UserRankingService {

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ){}

    public async updateRanking(userId: number, score: number) {
        const result = await this.cacheManager.set(userId.toString(), score,
        {
            ttl:1200   // 20분뒤 사라짐!
        });
        console.log("updateRanking");
    }

    //내림차순으로 랭킹조회
    public async searchRanking(userid : number) {
        console.log("00000")
        const result = await this.cacheManager.get(userid.toString())
        console.log("11111")
    }
}
