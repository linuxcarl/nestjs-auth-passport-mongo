import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class SkillsDto {
  @IsString()
  @IsNotEmpty()
  readonly tecnology: String;

  @IsString()
  @IsNotEmpty()
  readonly description: String;

  @IsString()
  @IsNotEmpty()
  readonly level: String;
}

export class UpdateSkillsDto extends PartialType(SkillsDto) {}
