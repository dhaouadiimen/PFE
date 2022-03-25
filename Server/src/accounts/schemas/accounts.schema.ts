import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
export type AccountsDocument = Accounts & Document;
@Schema()
export class Accounts {
    //Acountid
    /* @Prop()
    id:string; */

    @Prop()
    name : {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
      };
    @Prop()
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      };
      @Prop()
      profilePicture: {
        type: String,
        default: "",
      };

      @Prop()
      timestamps: true
}
export const AccountsSchema = SchemaFactory.createForClass(Accounts);