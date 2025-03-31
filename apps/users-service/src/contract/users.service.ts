import { Inject, Injectable } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { usersServiceMessagePatterns } from '../static/message-patterns';
import { CreateUserPayload } from '../data/users/types/create-user-payload.type';
import { FindByEmailPayload } from '../data/users/types/find-by-email-payload.type';
import { RemoveByIdPayload } from '../data/users/types/remove-by-id.payload';
import { UsersService as DataModuleUsersService } from '../data/users/users.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_SERVICE_CLIENT') private usersServiceClient: ClientProxy,
  ) {}

  async createUser(
    payload: CreateUserPayload,
  ): ReturnType<DataModuleUsersService['create']> {
    return await lastValueFrom(
      this.usersServiceClient.send(
        usersServiceMessagePatterns.createUser,
        payload,
      ),
    );
  }

  async removeById(
    payload: RemoveByIdPayload,
  ): ReturnType<DataModuleUsersService['removeById']> {
    return await lastValueFrom(
      this.usersServiceClient.send(
        usersServiceMessagePatterns.removeById,
        payload,
      ),
    );
  }

  async findByEmail(
    payload: FindByEmailPayload,
  ): ReturnType<DataModuleUsersService['findByEmail']> {
    return await lastValueFrom(
      this.usersServiceClient.send(
        usersServiceMessagePatterns.findByEmail,
        payload,
      ),
    );
  }
}
