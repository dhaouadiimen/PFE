import { Module } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { DiscussionsController } from './discussions.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Discussions, DiscussionsSchema } from "./schemas/discussions.schema";
import { DiscussionRepository } from "./discussions.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: Discussions.name, schema: DiscussionsSchema }])],
  providers: [DiscussionsService,DiscussionRepository],
  controllers: [DiscussionsController],
  exports:[DiscussionsService]
})
export class DiscussionsModule {}
