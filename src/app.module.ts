import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { User } from './users/users.entity';
import { BossRaidModule } from './boss-raid/boss-raid.module';
import { BossRaidEntity } from './boss-raid/boss-raid.entity';
import { UserRankingModule } from './user-ranking/user-ranking.module';
import { ConfigModule } from '@nestjs/config'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/../env/.$process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWD,
      database: process.env.DB_NAME,
      synchronize: true, // local only
      entities: [User, BossRaidEntity],
      })
      ,UsersModule, BossRaidModule, UserRankingModule],

})
export class AppModule {
  constructor(private dataSource : DataSource){}
}
