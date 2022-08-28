import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { User } from './users/users.entity';
import { BossRaidModule } from './boss-raid/boss-raid.module';
import { BossRaidEntity } from './boss-raid/boss-raid.entity';
import { UserRankingModule } from './user-ranking/user-ranking.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test_user',
      password: 'test_password',
      database: 'testdb',
      synchronize: true, // local only
      entities: [User, BossRaidEntity],
      })
      ,UsersModule, BossRaidModule, UserRankingModule],

})
export class AppModule {
  constructor(private dataSource : DataSource){}
}
