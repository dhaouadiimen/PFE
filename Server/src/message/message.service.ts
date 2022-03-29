import { Injectable, Res } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Message, MessageDocument } from './schemas/Message.schema';
import { MessageRepository } from './message.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

 
  //return list messages by discussion_id xxxx

  async getlistmessagesByDiscussion(discussionId): Promise<any> {
  const messages=  await this.messageModel.find({ discussionId: discussionId }).exec();
  }

  async createmessage(senderId,discussionId,content): Promise<Message> {
    console.log("ppppppppppppppppppp",senderId)
    console.log("77777777777777777777777777777",discussionId)
    let ms=new Message()
    ms.discussionId=discussionId
  ms.content=content
  ms.senderId=senderId
    const newmsj = new this.messageModel(ms);
    console.log("hihihiiiiiiiiiiiiiiiiiiiiiii",newmsj)
    return newmsj.save();
  }
// create message in discussion Id 
/* @params{
  // senderId,discuId , content 
} */
};
