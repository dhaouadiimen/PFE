import { Injectable, Res } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Message, MessageDocument } from './schemas/Message.schema';
import { MessageRepository } from './message.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}
  
  async createmessage(message: Message): Promise<Message> {
    const newmsj = new this.messageModel(message);
    return newmsj.save();
  }
 

  async readAll(): Promise<Message[]> {
    return await this.messageModel.find().exec();
  }

  //return list messages by discussion_id xxxx

  async getlistmessagesByDiscussion(DiscussionId): Promise<any> {
try{
  //const messages=  await this.messageModel.find({ DiscussionId: Req.params.DiscussionId, }).exec();
  //Res.status(200).json(messages);
} catch(err) {
  //Res.status(500).json(err);
}
  }

};
