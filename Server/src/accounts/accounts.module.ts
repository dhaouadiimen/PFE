import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Accounts, AccountsSchema } from './schemas/accounts.schema';
import { AccountsRepository } from './Accounts.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Accounts.name, schema: AccountsSchema },
    ]),
  ],
  providers: [AccountsService, AccountsRepository],
  controllers: [AccountsController],
  exports:[AccountsService]
})
export class AccountsModule {}
