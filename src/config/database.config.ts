import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>('MYSQL_DB_HOST'),
    port: configService.get<number>('MYSQL_DB_PORT'),
    username: configService.get<string>('MYSQL_DB_USER'),
    password: configService.get<string>('MYSQL_DB_PASSWORD'),
    database: configService.get<string>('MYSQL_DB_SCHMEA_1'),
    synchronize: configService.get<boolean>('MYSQL_DB_SYNCHRONIZE'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    logging: true
  }),
  inject: [ConfigService]
}

export const database2Config: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>('MYSQL_DB_HOST'),
    port: configService.get<number>('MYSQL_DB_PORT'),
    username: configService.get<string>('MYSQL_DB_USER'),
    password: configService.get<string>('MYSQL_DB_PASSWORD'),
    database: configService.get<string>('MYSQL_DB_SCHMEA_2'),
    synchronize: configService.get<boolean>('MYSQL_DB_SYNCHRONIZE'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    logging: true
  }),
  inject: [ConfigService]
}

export const database3Config: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>('MYSQL_DB_HOST'),
    port: configService.get<number>('MYSQL_DB_PORT'),
    username: configService.get<string>('MYSQL_DB_USER'),
    password: configService.get<string>('MYSQL_DB_PASSWORD'),
    database: configService.get<string>('MYSQL_DB_SCHMEA_3'),
    synchronize: configService.get<boolean>('MYSQL_DB_SYNCHRONIZE'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    logging: true
  }),
  inject: [ConfigService]
}
