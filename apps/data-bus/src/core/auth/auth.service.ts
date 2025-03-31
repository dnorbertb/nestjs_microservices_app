import { HttpStatus, Injectable } from '@nestjs/common';
import { RegisterPayload } from './types/register-payload.type';
import { LoginPayload } from './types/login-payload.type';
import { UsersService } from 'apps/users-service/src/contract/users.service';
import { BaseResponse } from 'common/dto/base-response.dto';
import { AuthService as AuthAppService } from 'apps/auth-service/src/contract/auth.service';
import { VerifyPayload } from './types/verify-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly authAppService: AuthAppService,
    private readonly usersService: UsersService,
  ) {}

  async register(payload: RegisterPayload) {
    const { password, ...userPayload } = payload;

    const createUserResponse = await this.usersService.createUser(userPayload);

    if (createUserResponse.statusCode !== HttpStatus.OK) {
      return createUserResponse;
    }

    const userData = createUserResponse.data!;

    const authServiceRegisterResponse = await this.authAppService.register({
      userId: userData.id,
      ...userPayload,
      password,
    });

    if (authServiceRegisterResponse.statusCode !== HttpStatus.OK) {
      this.usersService.removeById({ id: userData.id });
      return authServiceRegisterResponse;
    }

    return new BaseResponse({
      data: { ...userData, ...authServiceRegisterResponse.data },
    });
  }

  async login(payload: LoginPayload) {
    const { email, password } = payload;
    const userFetchResult = await this.usersService.findByEmail({ email });
    if (userFetchResult.statusCode !== HttpStatus.OK) {
      return userFetchResult;
    }
    const { id: userId, name } = userFetchResult.data!;
    const loginResult = await this.authAppService.login({
      userId,
      name,
      email,
      password,
    });

    if (loginResult.statusCode !== HttpStatus.OK) {
      return loginResult;
    }

    return new BaseResponse({
      data: {
        ...userFetchResult.data!,
        token: loginResult.data!.token,
      },
    });
  }

  async verify(payload: VerifyPayload) {
    const result = await this.authAppService.verify(payload);
    return result;
  }
}
