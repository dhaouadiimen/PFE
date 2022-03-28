import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';
import { Accounts, AccountsDocument } from "./schemas/accounts.schema";
import { AccountsRepository } from "./accounts.repository";
import { Model } from "mongoose";
import { HttpException } from '@nestjs/common';



@Injectable()
export class AccountsService {
    constructor(@InjectModel(Accounts.name) private accountsModel: Model<AccountsDocument>
    ) {}
     async create(account: Accounts): Promise<Accounts> {
        const newAccount= new this.accountsModel(account);
        return newAccount.save();
    }
    async findaccount(accountId: string): Promise<Accounts> {
        if(accountId){
            return  this.accountsModel.findOne({_id: accountId});
        }
        else {
            throw new HttpException(
              `AccountId Not found!!!!!!`,
              HttpStatus.NOT_FOUND,
            );
          
       }
       
    }
    async readAll(): Promise<Accounts[]> {
        return this.accountsModel.find().exec();
    }

}
