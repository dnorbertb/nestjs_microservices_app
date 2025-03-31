import { Global, Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { DataBusContractModule } from 'apps/data-bus/src/contract/contract.module';
import { DataBusContractConfig } from '../configs/data-bus-contract.config';

@Global()
@Module({
  imports: [
    DataBusContractModule.registerAsync({
      useFactory: async (configService: DataBusContractConfig) => {
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
      inject: [DataBusContractConfig],
    }),
  ],
  exports: [DataBusContractModule],
})
export class ContractsModule {}
