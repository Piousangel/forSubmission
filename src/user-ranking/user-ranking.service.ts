import { Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class UserRankingService {

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ){}

    public async updateRanking(key: number, value: number) {
        const result = await this.cacheManager.set('key', 'value',
        {
            ttl:1200   // 20분뒤 사라짐!
        });
    }

    //내림차순으로 랭킹조회
    public async searchRanking(userid : number) {
        const result = await this.cacheManager.get('userid')
    }
}
