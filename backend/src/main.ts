import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AuthService } from './modules/auth/auth.service';
import { TestTemplatesService } from './modules/test-templates/test-templates.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Initialize default data
  const authService = app.get(AuthService);
  const testTemplatesService = app.get(TestTemplatesService);

  try {
    await authService.createDefaultAdmin();
    await testTemplatesService.createDefaultTemplates();
    console.log('Default data initialized successfully');
  } catch (error) {
    console.error('Error initializing default data:', error);
  }

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
