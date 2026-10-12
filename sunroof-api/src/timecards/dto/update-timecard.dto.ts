import { PartialType } from '@nestjs/mapped-types';
import { CreateTimecardDto } from './create-timecard.dto.js';

export class UpdateTimecardDto extends PartialType(CreateTimecardDto, {
  skipNullProperties: false,
}) {}
