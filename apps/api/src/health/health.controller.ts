import { Controller, Get, HttpCode, HttpStatus, Logger, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import type { HealthCheckResponse } from '@fintrack/contracts';
import Redis from 'ioredis';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);
  private readonly redis: Redis;

  constructor(private readonly prisma: PrismaService) {
    const redisUrl = process.env['REDIS_URL'] ?? 'redis://localhost:6379';
    this.redis = new Redis(redisUrl, {
      lazyConnect: true,
      enableReadyCheck: true,
      maxRetriesPerRequest: 1,
      connectTimeout: 3000,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async check(): Promise<HealthCheckResponse> {
    const dbCheck = await this.checkDatabase();
    const redisCheck = await this.checkRedis();

    const isHealthy = dbCheck.status === 'up' && redisCheck.status === 'up';

    if (!isHealthy) {
      this.logger.warn('Health check failed', { database: dbCheck, redis: redisCheck });
      throw new ServiceUnavailableException({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        error: 'Service Unavailable',
        message: 'One or more dependencies are unavailable',
        timestamp: new Date().toISOString(),
        checks: { database: dbCheck, redis: redisCheck },
      });
    }

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env['npm_package_version'] ?? '0.1.0',
      checks: {
        database: dbCheck,
        redis: redisCheck,
      },
    };
  }

  private async checkDatabase(): Promise<{ status: 'up' | 'down'; latencyMs?: number }> {
    const start = Date.now();
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'up', latencyMs: Date.now() - start };
    } catch (err) {
      this.logger.error('Database health check failed', err instanceof Error ? err.message : String(err));
      return { status: 'down' };
    }
  }

  private async checkRedis(): Promise<{ status: 'up' | 'down'; latencyMs?: number }> {
    const start = Date.now();
    try {
      await this.redis.connect();
      const pong = await this.redis.ping();
      return pong === 'PONG' ? { status: 'up', latencyMs: Date.now() - start } : { status: 'down' };
    } catch (err) {
      this.logger.error('Redis health check failed', err instanceof Error ? err.message : String(err));
      return { status: 'down' };
    } finally {
      try { await this.redis.quit(); } catch { /* ignorar erro de cleanup */ }
    }
  }
}
