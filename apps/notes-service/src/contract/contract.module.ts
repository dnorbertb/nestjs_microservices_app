import { DynamicModule, Module } from '@nestjs/common';

import {
  ClientsModule,
  ClientsProviderAsyncOptions,
} from '@nestjs/microservices';
import { NotesService } from './notes.service';

@Module({})
export class NotesServiceContractModule {
  static async registerAsync(
    options: Omit<ClientsProviderAsyncOptions, 'name'>,
  ): Promise<DynamicModule> {
    return {
      module: NotesServiceContractModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: 'NOTES_SERVICE_CLIENT',
            ...options,
          },
        ]),
      ],
      exports: [NotesService],
      providers: [NotesService],
    };
  }
}
