import { IsString, Matches } from 'class-validator';

export class AskDto {
  @IsString()
  @Matches(/\S/, { message: 'message must not be blank' })
  message: string;
}
