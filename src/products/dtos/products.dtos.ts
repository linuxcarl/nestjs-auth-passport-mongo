import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;
  @IsNotEmpty()
  @IsNumber()
  readonly stock: number;
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {} // OmitType(CreateProductDto, ['name']),
