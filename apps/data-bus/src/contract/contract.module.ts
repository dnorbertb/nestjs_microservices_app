import { DynamicModule, Module } from '@nestjs/common';

import {
  ClientsModule,
  ClientsProviderAsyncOptions,
} from '@nestjs/microservices';
import { DataBusAuthService } from './auth.service';
import { DataBusNotesService } from './notes.service';

@Module({})
export class DataBusContractModule {
  static async registerAsync(
    options: Omit<ClientsProviderAsyncOptions, 'name'>,
  ): Promise<DynamicModule> {
    return {
      module: DataBusContractModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: 'DATA_BUS_SERVICE_CLIENT',
            ...options,
          },
        ]),
      ],
      providers: [DataBusAuthService, DataBusNotesService],
      exports: [DataBusAuthService, DataBusNotesService],
    };
  }
}
