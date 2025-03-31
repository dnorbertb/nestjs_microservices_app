import { Inject, Injectable } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { dataBusMessagePatterns } from '../static/message-patterns';
import { LoginPayload } from '../core/auth/types/login-payload.type';
import { RegisterPayload } from '../core/auth/types/register-payload.type';
import { VerifyPayload } from '../core/auth/types/verify-payload.type';
import { BaseResponse } from 'common/dto/base-response.dto';
import { UserBaseData } from 'common/types/user-base-data.type';

@Injectable()
export class DataBusAuthService {
  constructor(
    @Inject('DATA_BUS_SERVICE_CLIENT') private dataBusClient: ClientProxy,
  ) {}

  async register(
    payload: RegisterPayload,
  ): Promise<BaseResponse<{ id: number; token: string } & UserBaseData>> {
    return await lastValueFrom(
      this.dataBusClient.send(dataBusMessagePatterns.auth.register, payload),
    );
  }

  async login(
    payload: LoginPayload,
  ): Promise<BaseResponse<{ id: number; token: string } & UserBaseData>> {
    return await lastValueFrom(
      this.dataBusClient.send(dataBusMessagePatterns.auth.login, payload),
    );
  }

  async verify(
    payload: VerifyPayload,
  ): Promise<BaseResponse<{ id: number } & UserBaseData>> {
    return await lastValueFrom(
      this.dataBusClient.send(dataBusMessagePatterns.auth.verify, payload),
    );
  }
}
