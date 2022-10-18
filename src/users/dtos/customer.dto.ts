import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Skills } from '../entities/skills.entity';
import { SkillsDto } from './skills.dto';

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

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillsDto)
  readonly skills: SkillsDto[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
