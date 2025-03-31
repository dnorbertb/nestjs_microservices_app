import { Module } from '@nestjs/common';
import { ConfigsModule } from './configs/configs.module';

import { DatabaseModule } from './database/database.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [ConfigsModule, DatabaseModule, DataModule],
})
export class AppModule {}
