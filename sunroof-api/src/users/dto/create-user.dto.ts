import {
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/\S/, { message: 'name must not be blank' })
  name: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsNumber()
  @Min(0)
  costPerHour?: number;

  @ValidateIf((_object, value) => value !== undefined)
  @IsNumber()
  @Min(0)
  priceToCustomerPerHour?: number;
}
