import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BossRaidController } from './boss-raid.controller';
import { BossRaidEntity } from './boss-raid.entity';
import { BossRaidService } from './boss-raid.service';
import { HttpModule } from '@nestjs/axios';
import { DataSource } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserRankingService } from '../user-ranking/user-ranking.service';
import { User } from '../users/users.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,		// Redis의 기본포트번호
   }),
    TypeOrmModule.forFeature([BossRaidEntity]),
    TypeOrmModule.forFeature([User]),
    HttpModule],
  controllers: [BossRaidController],
  providers: [BossRaidService, UsersService, UserRankingService, 
    {provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,}
  ]
})

export class BossRaidModule {
  constructor(private dataSource : DataSource){}
}
