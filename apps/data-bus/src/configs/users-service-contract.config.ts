import { Configuration, Value } from '@itgorillaz/configify';
import { IsNotEmpty, IsString } from 'class-validator';

@Configuration()
export class UsersServiceContractConfig {
  @IsNotEmpty()
  @IsString()
  @Value('RMQ_HOST')
  host: string;

  @IsNotEmpty()
  @IsString()
  @Value('RMQ_USERS_SERVICE_USER')
  username: string;

  @IsNotEmpty()
  @IsString()
  @Value('RMQ_USERS_SERVICE_PASSWORD')
  password: string;

  @IsNotEmpty()
  @IsString()
  @Value('RMQ_USERS_SERVICE_QUEUE')
  queue: string;
}
