import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }), // pino logger gerenciado pelo nestjs-pino
    { bufferLogs: true },
  );

  // Logger estruturado Pino — substitui o logger padrão do NestJS
  app.useLogger(app.get(Logger));

  // Prefixo global da API
  app.setGlobalPrefix('api/v1');

  // Desligamento gracioso
  app.enableShutdownHooks();

  // Validação de entrada global (Zod no nível de DTO do NestJS)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Filtro global de exceções (RFC 7807)
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger / OpenAPI 3.0
  const swaggerConfig = new DocumentBuilder()
    .setTitle('FinTrack AI API')
    .setDescription(
      'API REST da plataforma de gestão financeira pessoal FinTrack AI. ' +
      'A IA é estritamente consultiva — nunca executa transações financeiras de forma autônoma.',
    )
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .addTag('health', 'Monitoramento e disponibilidade')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = Number(process.env['API_PORT'] ?? 3001);
  await app.listen(port, '0.0.0.0');

  const logger = app.get(Logger);
  logger.log(`🚀 FinTrack AI API rodando em http://localhost:${port}/api/v1`);
  logger.log(`📚 Swagger UI disponível em http://localhost:${port}/api/docs`);
}

void bootstrap();
