import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { authServiceMessagePatterns } from '../../static/message-patterns';
import { RegisterPayload } from './types/register-payload.type';
import { LoginPayload } from './types/login-payload.type';
import { VerifyPayload } from './types/verify-payload.type';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(authServiceMessagePatterns.register)
  register(@Payload() payload: RegisterPayload) {
    return this.authService.register(payload);
  }

  @MessagePattern(authServiceMessagePatterns.login)
  login(@Payload() payload: LoginPayload) {
    return this.authService.login(payload);
  }

  @MessagePattern(authServiceMessagePatterns.verify)
  verify(@Payload() payload: VerifyPayload) {
    return this.authService.verifyToken(payload);
  }
}
