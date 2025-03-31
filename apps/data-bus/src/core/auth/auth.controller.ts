import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { dataBusMessagePatterns } from '../../static/message-patterns';
import { RegisterPayload } from './types/register-payload.type';
import { LoginPayload } from './types/login-payload.type';
import { VerifyPayload } from './types/verify-payload.type';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(dataBusMessagePatterns.auth.register)
  register(@Payload() payload: RegisterPayload) {
    return this.authService.register(payload);
  }

  @MessagePattern(dataBusMessagePatterns.auth.login)
  login(@Payload() payload: LoginPayload) {
    return this.authService.login(payload);
  }

  @MessagePattern(dataBusMessagePatterns.auth.verify)
  verify(@Payload() payload: VerifyPayload) {
    return this.authService.verify(payload);
  }
}
