import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'mysql',
          host: configService.get<string>('MYSQL_DB_HOST'),
          port: configService.get<number>('MYSQL_DB_PORT'),
          username: configService.get<string>('MYSQL_DB_USER'),
          password: configService.get<string>('MYSQL_DB_PASSWORD'),
          database: configService.get<string>('MYSQL_DB_SCHEME_1'),
          synchronize: configService.get<boolean>('MYSQL_DB_SYNCHRONIZE'),
          entities: [__dirname + '/../../**/*.entity.{js,ts}'],
          logging: true
        } as TypeOrmModuleAsyncOptions),
      inject: [ConfigService]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'mysql',
          host: configService.get<string>('MYSQL_DB_HOST'),
          port: configService.get<number>('MYSQL_DB_PORT'),
          username: configService.get<string>('MYSQL_DB_USER'),
          password: configService.get<string>('MYSQL_DB_PASSWORD'),
          database: configService.get<string>('MYSQL_DB_SCHEME_2'),
          synchronize: configService.get<boolean>('MYSQL_DB_SYNCHRONIZE'),
          entities: [__dirname + '/../../**/*.entity.{js,ts}'],
          logging: true
        } as TypeOrmModuleAsyncOptions),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}
