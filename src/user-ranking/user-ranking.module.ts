import { Module } from '@nestjs/common';
import { UserRankingService } from './user-ranking.service';
// import { RedisModule } from '@nestjs-modules/ioredis';
// import { CacheModule } from '@nestjs/common';
// import * as redisStore from 'cache-manager-ioredis';
import * as redisStore from 'cache-manager-ioredis';
import { CacheModule } from '@nestjs/common';
@Module({
    imports: [
		CacheModule.register({
	      store: redisStore,
    	  host: 'localhost',
	      port: 6379,		// Redis의 기본포트번호
   	})],
    providers: [UserRankingService]
})
export class UserRankingModule {

}
