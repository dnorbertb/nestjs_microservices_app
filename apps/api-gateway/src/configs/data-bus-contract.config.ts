import { Configuration, Value } from '@itgorillaz/configify';
import { IsNotEmpty, IsString } from 'class-validator';

@Configuration()
export class DataBusContractConfig {
  @IsNotEmpty()
  @IsString()
  @Value('RMQ_HOST')
  host: string;

  @IsNotEmpty()
  @IsString()
  @Value('RMQ_DATA_BUS_USER')
  username: string;

  @IsNotEmpty()
  @IsString()
  @Value('RMQ_DATA_BUS_PASSWORD')
  password: string;

  @IsNotEmpty()
  @IsString()
  @Value('RMQ_DATA_BUS_QUEUE')
  queue: string;
}
