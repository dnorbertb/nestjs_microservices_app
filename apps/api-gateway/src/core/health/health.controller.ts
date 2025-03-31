import { Controller, Get } from '@nestjs/common';
import { BaseResponse } from 'common/dto/base-response.dto';

@Controller('health')
export class HealthController {
  @Get()
  health() {
    return new BaseResponse({ statusCode: 200, message: 'OK' });
  }
}
