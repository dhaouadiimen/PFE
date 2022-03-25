import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';
import { Accounts, AccountsDocument } from "./schemas/accounts.schema";
import { AccountsRepository } from "./accounts.repository";
import { Model } from "mongoose";

@Injectable()
export class AccountsService {

    constructor(@InjectModel(Accounts.name) private accountsModel: Model<AccountsDocument>) {}

    async create(account: Accounts): Promise<Accounts> {
        const newAccount= new this.accountsModel(account);
        return newAccount.save();
    }
    async findaccount(account: string): Promise<Accounts> {
        return  this.accountsModel.findOne({_id: account});
       
    }
    async getAccount(accountId): Promise<any> {
        
          const Account=  await this.accountsModel.find(accountId).exec();
          
        
          }


}
