import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  discussionId: string;

  @Prop()
  senderId: string;

  @Prop()
  content: '';

}
export const MessageSchema = SchemaFactory.createForClass(Message);
