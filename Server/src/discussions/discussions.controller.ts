import {
  Controller,
  Get,
  HttpStatus,
  Res,
  Body,
  Post,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { MessageService } from 'src/message/message.service';
import { DiscussionsService } from './discussions.service';
import { Discussions } from './schemas/discussions.schema';
import { createDiscussion } from './tdo/creatediscussion.dto';
@Controller('discussions')
export class DiscussionsController {
  constructor(
    private readonly discussionsService: DiscussionsService,
    private readonly accountssService: AccountsService
  ) {}
///////////////////////// route of create discussion ///////////////////////
  @Post('create')
  async createnewdiscussion(@Res() response, @Body() discussions: createDiscussion) {
    if(discussions.senderId =="" || discussions.receiverId ==""){
      return response.status(HttpStatus.NOT_FOUND).json({
        message:'sender Id or receiver Id Not found'
      })

    }
    const foundSenderId=await this.accountssService.findaccount(discussions.senderId);
    if(!foundSenderId){
      return response.status(HttpStatus.NOT_FOUND).json({
        message:'sender Id or receiver Id Not found'
      })

    }
    const foundReceiverId=await this.accountssService.findaccount(discussions.receiverId);
    if(!foundReceiverId){
      return response.status(HttpStatus.NOT_FOUND).json({
        message:'sender Id or receiver Id Not found'
      })

    }

    const newdiscussion = await this.discussionsService.creatediscussion(discussions.senderId,discussions.receiverId);
    return response.status(HttpStatus.CREATED).json({
      newdiscussion,
    });
  }


  // recuperer la liste des disscussions
  /* @Get()
    async fetchAllDiscussions( @Res() response) {
        const Listediscu = await this.discussionsService.readAll();
        return response.status(HttpStatus.OK).json({
            Listediscu
        })
    } */

  ///////////////////////////////////////////////// get liste discussions of user with accountid
  @Get('/:id')
  async findDiscuByIdUser(@Res() response, @Param('id') id) {
   const DiscuByAccountId = await this.discussionsService.getListeDiscuByAccountid(id);
   return response.status(HttpStatus.CREATED).json({
    DiscuByAccountId,
  });
}
} 

