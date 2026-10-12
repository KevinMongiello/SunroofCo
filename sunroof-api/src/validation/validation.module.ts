import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

export function createValidationPipe() {
  return new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  });
}

@Module({
  providers: [{ provide: APP_PIPE, useFactory: createValidationPipe }],
})
export class ValidationModule {}
