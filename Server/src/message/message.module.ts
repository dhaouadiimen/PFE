import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./schemas/Message.schema";
import { MessageController } from "./message.controller";
import { MessageRepository } from "./message.repository";
import { MessageService } from "./message.service";
import { AccountsModule } from "src/accounts/accounts.module";
import { DiscussionsModule } from "src/discussions/discussions.module";
import { EventsGateway } from "src/events/events.gateway";

@Module({
    imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    AccountsModule,DiscussionsModule],
    controllers: [MessageController],
    providers: [MessageService, MessageRepository,EventsGateway]
})
export class MessageModule {}