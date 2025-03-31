import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { ContractsModule } from './contracts/contracts.module';
import { ConfigsModule } from './configs/configs.module';

@Module({
  imports: [ConfigsModule, ContractsModule, CoreModule],
})
export class AppModule {}
