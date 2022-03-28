import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AccountsDocument = Accounts & Document;
@Schema()
export class Accounts {
  @Prop
  ({
    type: String,
    require: true,
    min: 3,
    max: 20,
  })
    name:string;

  @Prop({
    type: String,
    required: true,
    max: 50,
    unique: true,
  })

  email:string;

  @Prop({
    type: String,
    default: "",
  })
  profilePicture:string;
      

      @Prop()
      timestamps: true
}
export const AccountsSchema = SchemaFactory.createForClass(Accounts);