import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RegisterPayload } from '../data/auth/types/register-payload.type';
import { authServiceMessagePatterns } from '../static/message-patterns';
import { LoginPayload } from '../data/auth/types/login-payload.type';
import { VerifyPayload } from '../data/auth/types/verify-payload.type';
import { AuthService as DataModuleAuthService } from '../data/auth/auth.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE_CLIENT') private authServiceClient: ClientProxy,
  ) {}

  async register(
    payload: RegisterPayload,
  ): ReturnType<DataModuleAuthService['register']> {
    return await lastValueFrom(
      this.authServiceClient.send(authServiceMessagePatterns.register, payload),
    );
  }

  async login(
    payload: LoginPayload,
  ): ReturnType<DataModuleAuthService['login']> {
    return await lastValueFrom(
      this.authServiceClient.send(authServiceMessagePatterns.login, payload),
    );
  }

  async verify(
    payload: VerifyPayload,
  ): ReturnType<DataModuleAuthService['verifyToken']> {
    return await lastValueFrom(
      this.authServiceClient.send(authServiceMessagePatterns.verify, payload),
    );
  }
}
