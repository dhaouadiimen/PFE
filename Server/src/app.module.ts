import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscussionsModule } from './discussions/discussions.module';
import { MessageModule } from './message/message.module';
import { AccountsModule } from './accounts/accounts.module';
import { EventsModule } from './events/events.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    DiscussionsModule,
    MessageModule,
    AccountsModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
