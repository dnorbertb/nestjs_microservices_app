import { DynamicModule, Module } from '@nestjs/common';
import {
  ClientsModule,
  ClientsProviderAsyncOptions,
} from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Module({})
export class AuthServiceContractModule {
  static async registerAsync(
    options: Omit<ClientsProviderAsyncOptions, 'name'>,
  ): Promise<DynamicModule> {
    return {
      module: AuthServiceContractModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: 'AUTH_SERVICE_CLIENT',
            ...options,
          },
        ]),
      ],
      exports: [AuthService],
      providers: [AuthService],
    };
  }
}
