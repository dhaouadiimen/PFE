import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';
import { Accounts, AccountsDocument } from "./schemas/accounts.schema";
import { AccountsRepository } from "./accounts.repository";
import { Model } from "mongoose";
import { HttpException } from '@nestjs/common';
import mongoose from "mongoose";



@Injectable()
export class AccountsService {
    constructor(@InjectModel(Accounts.name) private accountsModel: Model<AccountsDocument>) {}
     async create(account: Accounts): Promise<Accounts> {
        const newAccount= new this.accountsModel(account);
        return newAccount.save();
    }
    async findaccount(accountId: string): Promise<Accounts> {
        //console.log('************AccountId***********',accountId);
        try{
          return await  this.accountsModel.findOne({ _id:  accountId }).exec();
        }
        catch(err){
return null ;
        }
       
    }

    
    async readAll(): Promise<Accounts[]> {
        return this.accountsModel.find().exec();
    }

}
