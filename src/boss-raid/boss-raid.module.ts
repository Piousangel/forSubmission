import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BossRaidController } from './boss-raid.controller';
import { BossRaidEntity } from './boss-raid.entity';
import { BossRaidService } from './boss-raid.service';
import { HttpModule } from '@nestjs/axios';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([BossRaidEntity]),
    HttpModule],
  controllers: [BossRaidController],
  providers: [BossRaidService]
})

export class BossRaidModule {
  constructor(private dataSource : DataSource){}
}
