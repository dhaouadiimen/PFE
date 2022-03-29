import { Module } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { DiscussionsController } from './discussions.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Discussions, DiscussionsSchema } from "./schemas/discussions.schema";
import { DiscussionRepository } from "./discussions.repository";
import { AccountsService } from 'src/accounts/accounts.service';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Discussions.name, schema: DiscussionsSchema }]),
  AccountsModule],
  providers: [DiscussionsService,DiscussionRepository],
  controllers: [DiscussionsController],
  exports:[DiscussionsService]
})
export class DiscussionsModule {}
