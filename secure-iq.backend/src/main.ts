import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  app.use(cookieParser());
  await app
    .listen(process.env.PORT ?? 3001)
    .then(() => {
      console.log(`Server is running on port ${process.env.PORT ?? 3001}`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
