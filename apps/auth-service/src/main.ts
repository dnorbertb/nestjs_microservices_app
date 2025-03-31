import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqHost = process.env.RMQ_HOST;
  const rmqUser = process.env.RMQ_AUTH_SERVICE_USER;
  const rmqPassword = process.env.RMQ_AUTH_SERVICE_PASSWORD;
  const rmqQueueName = process.env.RMQ_AUTH_SERVICE_QUEUE;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rmqUser}:${rmqPassword}@${rmqHost}`],
      queue: rmqQueueName,
      queueOptions: {
        durable: false,
      },
    },
  });
  app.startAllMicroservices();
}
bootstrap();
