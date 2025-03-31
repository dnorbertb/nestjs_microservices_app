import { Configuration, Value } from '@itgorillaz/configify';
import { IsBoolean } from 'class-validator';

@Configuration()
export class AppConfig {
  @IsBoolean()
  @Value('DEV', { parse: (v) => ['true', '1', 1].includes(v) })
  devEnv: boolean;
}
