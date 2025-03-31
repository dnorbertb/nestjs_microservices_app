import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ContractsModule } from './contracts/contracts.module';
import { CoreModule } from './core/core.module';
import { ConfigsModule } from './configs/configs.module';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  imports: [ConfigsModule, ContractsModule, CoreModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
