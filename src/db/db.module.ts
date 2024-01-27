import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Users } from '../users/users.model';
import { getDbConfig } from '../config/Db.config';


@Module({

    imports: [
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: () => ({
                dialect: 'postgres',
                host: getDbConfig().host,
                port: getDbConfig().port,
                username: getDbConfig().username,
                password: getDbConfig().password,
                database: getDbConfig().database,
                models: [
                    Users
                ]
            })
        }),
    ]
})
export class DbModule { }