import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
export type DiscussionsDocument = Discussions & Document;
@Schema()
export class Discussions 
{
  
  _id:string;
  @Prop([String])
  parts: string[];
 
}
export const DiscussionsSchema = SchemaFactory.createForClass(Discussions);