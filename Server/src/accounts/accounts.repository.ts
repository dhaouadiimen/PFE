import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Accounts, AccountsDocument } from "./schemas/accounts.schema";
@Injectable()
export class AccountsRepository {
    //constructor(@InjectModel(Accounts.name) private accountsModel: Model<AccountsDocument>) {} 
    /* async find(usersFilterQuery: FilterQuery<Accounts>): Promise<Accounts[]> {
        return this.accountsModel.find(usersFilterQuery);
    }
    async findOne(usersFilterQuery: FilterQuery<Accounts>): Promise<Accounts[]> {
        return this.accountsModel.findOne(usersFilterQuery);
    } */
}