import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { Message, MessageDocument } from "./schemas/Message.schema";

@Injectable()
export class MessageRepository {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}
    async find(usersFilterQuery: FilterQuery<Message>): Promise<Message[]> {
        return this.messageModel.find(usersFilterQuery)
        

    }

    async findById(usersFilterQuery: FilterQuery<Message>): Promise<Message[]> {
        return this.messageModel.findById(usersFilterQuery)
        

    }


    
}