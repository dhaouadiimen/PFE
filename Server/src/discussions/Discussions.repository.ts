import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Discussions, DiscussionsDocument } from "./schemas/discussions.schema";
@Injectable()
export class DiscussionRepository {
    constructor(@InjectModel(Discussions.name) private disscusionsModel: Model<DiscussionsDocument>) {}
    async find(usersFilterQuery: FilterQuery<Discussions>): Promise<Discussions[]> {
        return this.disscusionsModel.find(usersFilterQuery);
    }
    async findOne(usersFilterQuery: FilterQuery<Discussions>): Promise<Discussions[]> {
        return this.disscusionsModel.findOne(usersFilterQuery);
    }
}