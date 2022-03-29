import { Injectable,Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';
import { Discussions, DiscussionsDocument } from "./schemas/discussions.schema";
import { DiscussionRepository } from "./Discussions.repository";
import { Model } from "mongoose";
import { Accounts } from "src/accounts/schemas/accounts.schema";

@Injectable()
export class DiscussionsService {
    constructor(@InjectModel(Discussions.name) private discussionModel: Model<DiscussionsDocument>
    ) {}

    async creatediscussion(senderId,receiverId): Promise<Discussions> {
      const parts=[senderId,receiverId]
        return this.discussionModel.create({parts});
    }
        
        async finddiscu(discussionId: string): Promise<Accounts> {
          return  this.discussionModel.findOne({_id: discussionId});
      }

     async getListeDiscuByAccountid(accountId): Promise<any> {
         return  await this.discussionModel.find({
           /* parts:{$in:[accountId]}, */
           parts:{ $in: accountId } 

         });
    }  
    async checkSenderExisting(discussionId,senderId): Promise<any> {
      console.log('discuuuuuuuuuuuuuuuuuuuuuuuuuuuu',discussionId);
      
      try{
        const a = await this.discussionModel.findOne({ parts: { $in: senderId } }, { _id: discussionId } ).exec();
  
        console.log("galbyyyyyyyyyyyyyyyyyy",a);
        console.log("object",Object.keys(a).length);
        return  a ;
      }
      catch(err){
return null;
      }
      
 }
      }


      

  /*   async creatediscussion((senderID: Accounts, recieverID: Accounts, content: Object)): Promise<Discussions> {
        const newDiscussions = new this.discussionModel(discussions);
        return newDiscussions.save()
    } */
    /* async readAll(): Promise<Discussions[]> {
        return this.discussionModel.find().exec();
    }
     */
    

   




