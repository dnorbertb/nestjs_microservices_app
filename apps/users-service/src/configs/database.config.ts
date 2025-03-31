import { Configuration, Value } from '@itgorillaz/configify';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Configuration()
export class DatabaseConfig {
  @IsBoolean()
  @Value('DEV', { parse: (v) => ['true', '1', 1].includes(v) })
  devEnv: boolean;

  @IsNotEmpty()
  @Value('DB_TYPE', { default: 'postgres' })
  dbType: TypeOrmModuleOptions['type'];

  @IsNotEmpty()
  @Value('USERS_SERVICE_DB_NAME', { default: 'usersService' })
  database: string;

  @IsNotEmpty()
  @IsString()
  @Value('DB_HOST')
  host: string;

  @IsNotEmpty()
  @IsNumber()
  @Value('DB_PORT', { parse: parseInt })
  port: number;

  @IsNotEmpty()
  @IsString()
  @Value('DB_USER')
  username: string;

  @IsNotEmpty()
  @IsString()
  @Value('DB_PASSWORD')
  password: string;
}
