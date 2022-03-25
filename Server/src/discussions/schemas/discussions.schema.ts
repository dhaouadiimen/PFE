import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
export type DiscussionsDocument = Discussions & Document;
@Schema()
export class Discussions 
{

  @Prop([String])
  parts: string[];
 /*  
  @Prop()
  discussionId:string; */
 
}
export const DiscussionsSchema = SchemaFactory.createForClass(Discussions);