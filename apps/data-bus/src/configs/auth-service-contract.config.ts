import { Configuration, Value } from '@itgorillaz/configify';
import { IsNotEmpty, IsString } from 'class-validator';

@Configuration()
export class AuthServiceContractConfig {
  @IsNotEmpty()
  @IsString()
  @Value('RMQ_HOST')
  host: string;

  @IsNotEmpty()
  @IsString()
  @Value('RMQ_AUTH_SERVICE_USER')
  username: string;

  @IsNotEmpty()
  @IsString()
  @Value('RMQ_AUTH_SERVICE_PASSWORD')
  password: string;

  @IsNotEmpty()
  @IsString()
  @Value('RMQ_AUTH_SERVICE_QUEUE')
  queue: string;
}
