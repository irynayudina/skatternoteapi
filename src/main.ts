import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://skatternoteapi-production.up.railway.app/',
      'http://localhost:3000',
      'https://scatternote.netlify.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0'); // ⬅️ ADD THIS PARAMETER!
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
