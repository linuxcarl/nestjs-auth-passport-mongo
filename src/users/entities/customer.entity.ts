import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SkillsDto } from '../dtos/skills.dto';

@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  phone: string;

  @Prop(() => [SkillsDto])
  readonly skills: Types.Array<SkillsDto>;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
