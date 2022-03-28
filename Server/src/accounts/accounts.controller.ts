import { Controller,Get,HttpStatus,Res,Body,Post,Param,Delete,Put} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Accounts } from './schemas/accounts.schema';
@Controller('account')
export class AccountsController {
     constructor(private readonly AccountsService: AccountsService){} 
     @Post("/add")
    async createaccount(@Res() response, @Body() account: Accounts) {
        const newaccount = await this.AccountsService.create(account);
        return response.status(HttpStatus.CREATED).json({
            newaccount
        })
    }

    @Get()
    async fetchAllAccounts( @Res() response) {
        const Listeaccounts = await this.AccountsService.readAll();
        return response.status(HttpStatus.OK).json({
          Listeaccounts
        })
      }

    // get Account with AccountId 
    @Get('/:id')
  async findAccount(@Res() response, @Param('id') id) {  
    const Account =await this.AccountsService.findaccount(id);
    return response.status(HttpStatus.OK).json({
        Account,
    });
  }
}