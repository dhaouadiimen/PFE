import {
  Controller,
  Get,
  HttpStatus,
  Res,
  Body,
  Post,
  Param,
} from '@nestjs/common';
import { Message } from './schemas/Message.schema';
import { Accounts } from '../accounts/schemas/accounts.schema';
import { MessageService } from './message.service';
import { response } from 'express';
import { HttpException } from '@nestjs/common';
import { Discussions } from '../discussions/schemas/discussions.schema';
import { AccountsService } from 'src/accounts/accounts.service';
import { DiscussionsService } from 'src/discussions/discussions.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly accountsService: AccountsService,
    private readonly discussionsService: DiscussionsService,
  ) {}
  /*
  @Post("/postMsg")
  async createmessage(@Res() response, @Body() body: Object) {
    if(body.senderId && (body.recieverID || body.discussionID ) && body.msg){
      // DATA VERIFICATION 
      let discussion = null;
      let reciever = null;
      //search senderId exist in account or no 
      let sender = await Accounts.findOne({_id: body.senderId});
      //id of sender does not exist
      if(!sender){
        throw INPUT_ERROR;
      }
      if(body.recieverID){
        reciever = await Account.findOne({_id: body.recieverID});
        if(!reciever) throw INPUT_ERROR;
      }
      
      else if(body.discussionID)
      {
        discussion = await Discussion.findOne({_id: body.discussionID})
        if(!discussion) throw INPUT_ERROR;
      }

      // PROCESS  
      //discu not null = discu exist 
      if(discussion){
        // appel a la fct post msj 
        postMessage(discussion, body.msg);
      }
      else if(discussion = check_existing_discussion(sender, reciever))  
      {
        postMessage(discussion, body.msg);
      }
      else{
        discussion = await this.discussionsService.create(sender, reciever, body.msg);
        const parts = await this.partsService.addPart(discussion, sender);
        const parts2 = await this.partsService.addPart(discussion, reciver);
        const newmsj = await this.messageService.createmsj(discussion, body.msg);
      }

    }
    else{
      throw INPUT_ERROR;
    }
      const newmsj = await this.messageService.createmsj(message);
      return response.status(HttpStatus.CREATED).json({
          newmsj
      })
  }
  */

  // add msj in discu exist
  @Post('/create')
  //(@Res() response, @Body() message: Message) {
  /* async postMessageIndiscussion(@Res() response, @Body() message: Message) {
    //@Body() complete body
    const newmsj = await this.messageService.createmessage(senderId,discussionId,content);
    try{
      response.status(HttpStatus.CREATED).json({newmsj,});
    }
    catch {
      throw new HttpException(`error posting message`, HttpStatus.FORBIDDEN);
    }
  } */
  @Get('/allmsj')
  async getlistmsj(@Res() response) {
    const listmessages = await this.messageService.readAll();
    return response.status(HttpStatus.OK).json({
      listmessages,
    });
  }
  //////////////////////////////////////// 2/return list messages by discussion id xxxx//////////////////////////////////////
  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    console.log('discu id ', id);
    const listemessagesBydiscussion =
      await this.messageService.getlistmessagesByDiscussion(id);
    return response.status(HttpStatus.OK).json({
      listemessagesBydiscussion,
    });
  }
  @Post('/add')
  async createmessageindiscussion(@Res() response, @Body() message: Message) {
    let senderId;
    let discussionId;
    let content;
    if (message.senderId && message.discussionId && message.content) {
      // DATA VERIFICATION
      //search senderId exist in accounts or no
      senderId = await this.accountsService.findaccount(message.senderId);
      if (!senderId) {
        throw new HttpException(`senderId not found`, HttpStatus.NOT_FOUND);
      }
      /* if (recieverID) {
        recieverID = await this.accountsService.findaccount(recieverID);
        if (!recieverID) {
          throw new HttpException(`receiverId not found`, HttpStatus.NOT_FOUND);
        }
      } */
      if (discussionId) {
        //discussionId = await Discussions.findOne({ _id: discussionId });
        discussionId = await this.discussionsService.finddiscu(discussionId);
        if (!discussionId) {
          throw new HttpException(
            `discussionId not found`,
            HttpStatus.NOT_FOUND,
          );
        }
      }

      if (content.length === 0) {
        throw new HttpException(
          `content of message is empty !!!`,
          HttpStatus.NOT_FOUND,
        );
      }

                                                  /*PROCESS */

// 01) test if sender and receiver have a discussion between us or no ????
// 01)1) discussion between sender and receiver exist

  if(discussionId==true){
    /* @Params 
    {
      discussionId
      senderId
      content
    } */
    this.postMessageIndiscussion(senderId,discussionId,content);
  }
  // 01)2) discussion between sender and receiver does notttt exist!!!
  else{
    //create a new discussion and add the parts to it (sender + receiver) 
    const newdiscussion = await this.discussionsService.creatediscussion(senderId,recieverID);
    //postMessageIndiscussion() 
    this.postMessageIndiscussion(senderId,discussionId,content);
    
  }
} 
    }
    
  }

