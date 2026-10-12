import { applyDecorators } from '@nestjs/common';
import { IsDateString, Matches } from 'class-validator';

export function IsDateOnly() {
  return applyDecorators(
    Matches(/^\d{4}-\d{2}-\d{2}$/, {
      message: '$property must use YYYY-MM-DD format',
    }),
    IsDateString({ strict: true }),
  );
}
