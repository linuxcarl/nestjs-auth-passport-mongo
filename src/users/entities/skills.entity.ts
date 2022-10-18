import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Skills extends Document {
  @Prop({ required: true })
  tecnology: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  level: 'beginner' | 'intermediate' | 'advanced';
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
