import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// import * as config from 'config';
// const dbConfig = config.get('db');

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'user-app',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}