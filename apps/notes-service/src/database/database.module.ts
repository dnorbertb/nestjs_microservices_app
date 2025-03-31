import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig } from '../configs/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (dbConfig: DatabaseConfig) => {
        return {
          type: dbConfig.dbType,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          synchronize: dbConfig.devEnv,
          autoLoadEntities: true,
        } as TypeOrmModuleOptions;
      },
      inject: [DatabaseConfig],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
