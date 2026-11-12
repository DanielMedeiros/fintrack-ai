import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

interface FastifyLikeReply {
  status(code: number): this;
  send(payload: unknown): void;
}

interface FastifyLikeRequest {
  url: string;
}

/**
 * Filtro global de exceções HTTP (RFC 7807 — Problem Details for HTTP APIs).
 * Garante que nenhum stack trace ou detalhe interno vaze nas respostas de erro.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyLikeReply>();
    const request = ctx.getRequest<FastifyLikeRequest>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = 'Erro interno do servidor';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object' && response !== null) {
        const responseObj = response as Record<string, unknown>;
        message = (responseObj['message'] as string | string[]) ?? exception.message;
        error = (responseObj['error'] as string) ?? exception.name;
      }
    } else if (exception instanceof Error) {
      // Registra o erro real internamente, mas NÃO vaza para o cliente
      this.logger.error(
        `Unhandled exception: ${exception.message}`,
        exception.stack,
        HttpExceptionFilter.name,
      );
    } else {
      this.logger.error('Unknown exception type thrown', String(exception));
    }

    reply.status(status).send({
      statusCode: status,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
