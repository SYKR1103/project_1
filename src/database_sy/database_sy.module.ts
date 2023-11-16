import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';

@Module({

    imports : [

        TypeOrmModule.forRootAsync({

            imports :[ConfigModule],
            inject : [ConfigService],
            useFactory : (ConfigService:ConfigService) => ({

                type : 'postgres',
                port : ConfigService.get('POSTGRES_PORT'),
                host : ConfigService.get('POSTGRES_HOST'),
                username : ConfigService.get('POSTGRES_USER'),
                password : ConfigService.get('POSTGRES_PASSWORD'),
                database : ConfigService.get('POSTGRES_DB'),

            entities : [ __dirname + "/../**/*.entity{.ts,.js}"],
            autoLoadEntities : true,
            synchronize :true

        }),



        })



    ]




})
export class DatabaseSyModule {}
