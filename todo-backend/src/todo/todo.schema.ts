import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true , default: false})
  completed: boolean;

  @Prop()  // Due date is optional
  dueDate?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
