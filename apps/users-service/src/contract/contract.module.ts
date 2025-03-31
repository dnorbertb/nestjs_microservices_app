import { DynamicModule, Module } from '@nestjs/common';

import {
  ClientsModule,
  ClientsProviderAsyncOptions,
} from '@nestjs/microservices';
import { UsersService } from './users.service';

/**
 * Don't import internally, this is external interface to communicate with this microservice
 */
@Module({})
export class UsersServiceContractModule {
  static async registerAsync(
    options: Omit<ClientsProviderAsyncOptions, 'name'>,
  ): Promise<DynamicModule> {
    return {
      module: UsersServiceContractModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: 'USERS_SERVICE_CLIENT',
            ...options,
          },
        ]),
      ],
      exports: [UsersService],
      providers: [UsersService],
    };
  }
}
