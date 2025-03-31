import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const isDevEnv = ['1', 'true', 1].includes(process.env.DEV ?? 'false');

  if (isDevEnv) {
    const openAPIDocument = JSON.parse(
      readFileSync(`${process.cwd()}/docs/openapi.json`, 'utf8'),
    );
    SwaggerModule.setup('api-docs', app, openAPIDocument);
  }

  // Run
  const appPort = process.env.API_GATEWAY_PORT ?? 3000;
  await app.listen(appPort);
  Logger.log('Api gateway listening on port ' + appPort, 'START LOG');
}
bootstrap();
