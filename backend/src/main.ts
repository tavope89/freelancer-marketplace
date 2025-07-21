import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // ✅ Allow all origins, or configure properly for production
    credentials: true,
  });

  const port = process.env.PORT || 4000; // ✅ Use Railway-assigned port or default to 4000
  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
