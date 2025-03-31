import { Global, Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { UsersServiceContractModule } from 'apps/users-service/src/contract/contract.module';
import { UsersServiceContractConfig } from '../configs/users-service-contract.config';
import { AuthServiceContractModule } from 'apps/auth-service/src/contract/contract.module';
import { AuthServiceContractConfig } from '../configs/auth-service-contract.config';
import { NotesServiceContractModule } from 'apps/notes-service/src/contract/contract.module';
import { NotesServiceContractConfig } from '../configs/notes-service-contract.config';

@Global()
@Module({
  imports: [
    // Users service
    UsersServiceContractModule.registerAsync({
      useFactory: async (configService: UsersServiceContractConfig) => {
        const { host, username, password, queue } = configService;

        return {
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${username}:${password}@${host}`],
            queue,
            queueOptions: {
              durable: false,
            },
          },
        };
      },
      inject: [UsersServiceContractConfig],
    }),
    // Auth service
    AuthServiceContractModule.registerAsync({
      useFactory: async (configService: AuthServiceContractConfig) => {
        const { host, username, password, queue } = configService;

        return {
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${username}:${password}@${host}`],
            queue,
            queueOptions: {
              durable: false,
            },
          },
        };
      },
      inject: [AuthServiceContractConfig],
    }),
    // Notes service
    NotesServiceContractModule.registerAsync({
      useFactory: async (configService: NotesServiceContractConfig) => {
        const { host, username, password, queue } = configService;

        return {
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${username}:${password}@${host}`],
            queue,
            queueOptions: {
              durable: false,
            },
          },
        };
      },
      inject: [NotesServiceContractConfig],
    }),
  ],
  exports: [
    UsersServiceContractModule,
    AuthServiceContractModule,
    NotesServiceContractModule,
  ],
})
export class ContractsModule {}
