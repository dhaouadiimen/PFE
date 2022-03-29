import{Controller,Get,HttpStatus,Res,Body,Post,Param} from '@nestjs/common';
import { Message } from './schemas/Message.schema';
import { MessageService } from './message.service';
import { HttpException } from '@nestjs/common';
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
  @Post("/add")
  async createmessageindiscussion(@Res() response, @Body() message: Message) {
   let senderId;
    let discussionId ;
   let content;
    
    if (message.senderId && message.discussionId && message.content) {
      // DATA VERIFICATION
      //search senderId exist in accounts or no
    
      
         if (content=="") {
        throw new HttpException(
          `content of message is empty !!!`,
          HttpStatus.NOT_FOUND,
        );
      }  

                                                  /*PROCESS */
  
    /* @Params 
    {
      discussionId
      senderId
      content
    } */
    // verif senderId is parts  in discussion for send the message 
  
const check = await this.discussionsService.checkSenderExisting(message.discussionId,message.senderId);
console.log('yyyyyyyyyyyyyyyyzzzzzzzzz',check);
console.log("checkkkkkkkkkk",Object.keys(check).length);
if(check && check!=null){
  const newmsj  =  await this.messageService.createmessage(message.senderId,message.discussionId,message.content);
  return response.status(HttpStatus.CREATED).json(newmsj);
}    
else{
  return response.status(HttpStatus.NOT_FOUND).json({message:"faddddddddddddyttttttttttttt"});
  }
}
  }

    async createmessageinNewdiscussion(@Res() response, @Body() message: Message) {
      let senderId;
       let discussionId ;
      let content:string;
      let receiverId;
       
       if (message.senderId && message.discussionId && message.content) {
         // DATA VERIFICATION
         //search senderId exist in accounts or no
        senderId = await this.accountsService.findaccount(message.senderId);
        discussionId = await this.discussionsService.finddiscu(message.discussionId);
         if (!senderId) 
         {
           throw new HttpException
           (`senderId not found`, 
           HttpStatus.NOT_FOUND);
         }
           else if (!discussionId) {
             throw new HttpException(
               `discussionId not found`,
               HttpStatus.NOT_FOUND,
             );
           }
          /* else if (content.length=== 0) {
           throw new HttpException(
             `content of message is empty !!!`,
             HttpStatus.NOT_FOUND,
           );
         }  */
   
                                                     /*PROCESS */
     discussionId = await this.discussionsService.finddiscu(message.discussionId);
     if(discussionId){
       /* @Params 
       {
         discussionId
         senderId
         content
       } */
       // verif senderId is parts for send the message 
   const check = await this.discussionsService.checkSenderExisting(discussionId,senderId);
   if(check){
     const newmsj = await this.messageService.createmessage(senderId,discussionId,content);
     try{
       response.status(HttpStatus.CREATED).json({newmsj});
     }
     catch {
       throw new HttpException(`error posting message`, HttpStatus.FORBIDDEN);
     }
   }    
     }
     else{ 
       const newdiscussion = await this.discussionsService.creatediscussion(receiverId,senderId);
       this.messageService.createmessage(senderId,discussionId,content);
       
     }
   } 
       }
    
      }

