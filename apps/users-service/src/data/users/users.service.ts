import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserPayload } from './types/create-user-payload.type';
import { BaseResponse } from 'common/dto/base-response.dto';
import { FindByEmailPayload } from './types/find-by-email-payload.type';
import { RemoveByIdPayload } from './types/remove-by-id.payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserPayload): Promise<BaseResponse<User>> {
    try {
      const user = this.userRepository.create(payload);
      const result = await this.userRepository.save(user);
      return new BaseResponse({ data: result, message: 'User created' });
    } catch (error) {
      // Unique field duplication (PostgreSQL)
      if (error.code === '23505') {
        return new BaseResponse({
          message: 'User already exist',
          statusCode: HttpStatus.CONFLICT,
        });
      }
      Logger.log('Error saving user to database', error, 'USERS SERVICE');
      return new BaseResponse({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR });
    }
  }

  async removeById(payload: RemoveByIdPayload) {
    try {
      const { id } = payload;
      const entity = await this.userRepository.findOneBy({ id });
      if (!entity) {
        return new BaseResponse({
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      const result = await this.userRepository.remove(entity);
      return new BaseResponse({
        data: result,
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      Logger.log(
        'Error occurred when trying to remove user by id',
        error,
        'USERS SERVICE',
      );
      return new BaseResponse({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findByEmail(payload: FindByEmailPayload): Promise<BaseResponse<User>> {
    try {
      const { email } = payload;
      const user = await this.userRepository.findOneBy({ email });
      return new BaseResponse({
        data: user,
        message: user ? undefined : 'User not found',
        statusCode: user ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      });
    } catch (error) {
      Logger.log(
        'Error occurred when trying to find user by id',
        error,
        'USERS SERVICE',
      );
      return new BaseResponse({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR });
    }
  }
}
