import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Auth } from './entity/auth.entity';
import { RegisterPayload } from './types/register-payload.type';
import { LoginPayload } from './types/login-payload.type';
import { JwtService } from '@nestjs/jwt';
import { BaseResponse } from 'common/dto/base-response.dto';
import { VerifyPayload } from './types/verify-payload.type';
import { JwtPayload } from 'common/types/jwt-payload';
import { UserBaseData } from 'common/types/user-base-data.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterPayload) {
    try {
      const { password, userId, ...restOfPayload } = payload;
      const hashedPassword = await bcrypt.hash(password, 10);
      const entity = this.authRepository.create({
        userId,
        password: hashedPassword,
      });
      await this.authRepository.save(entity);
      const token = this.jwtService.sign({ id: userId, ...restOfPayload });
      return new BaseResponse({ data: { token } });
    } catch (error) {
      Logger.error('Error registering user', error, 'AUTH SERVICE');
      return new BaseResponse({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR });
    }
  }

  async login(payload: LoginPayload) {
    try {
      const { userId, password, ...restOfPayload } = payload;
      const authEntity = (await this.authRepository.findBy({ userId }))[0];

      if (!authEntity) {
        throw new Error(
          'Auth entity with given userId not found. That should not happen!',
        );
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        authEntity.password,
      );

      if (!isPasswordValid) {
        return new BaseResponse({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        });
      }

      const token = this.jwtService.sign({ id: userId, ...restOfPayload });
      return new BaseResponse({ data: { token } });
    } catch (error) {
      Logger.error('Error when logging in', error, 'AUTH SERVICE');
      return new BaseResponse({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR });
    }
  }

  async verifyToken(payload: VerifyPayload) {
    try {
      const result: JwtPayload<UserBaseData> = await this.jwtService.verify(
        payload.token,
      );
      return new BaseResponse({ data: result });
    } catch (error) {
      return new BaseResponse({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
  }
}
