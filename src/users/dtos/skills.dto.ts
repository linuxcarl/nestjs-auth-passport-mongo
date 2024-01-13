import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class SkillsDto {
  @IsString()
  @IsNotEmpty()
  readonly tecnology: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly level: string;
}

export class UpdateSkillsDto extends PartialType(SkillsDto) {}
