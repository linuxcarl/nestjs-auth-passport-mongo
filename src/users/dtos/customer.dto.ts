import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @ValidateNested()
  @Type(() => Skills)
  readonly skills: Skills[];
}
export class Skills {
  // Sub clase para tipar los datos
  @IsNotEmpty()
  tecnology: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  level: 'beginner' | 'intermediate' | 'advanced';
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
