import{Controller,Get,HttpStatus,Res,Body,Post,Param} from '@nestjs/common';
import { Message } from './schemas/Message.schema';
import { MessageService } from './message.service';
import { HttpException } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { DiscussionsService } from 'src/discussions/discussions.service';
import { createMessage } from './tdo/createmessage.tdo';
import { Discussions } from 'src/discussions/schemas/discussions.schema';

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
      /* @Params 
    {
      discussionId
      senderId
      content

    } */
  async createmessageinExistingdiscussion(@Res() response, @Body() message: Message) {
   let senderId;
   let discussionId ;
      // DATA VERIFICATION
      //search senderId exist in accounts or no
      senderId = await this.accountsService.findaccount(message.senderId);
      discussionId = await this.discussionsService.finddiscu(message.discussionId);
      console.log("discuId",message.discussionId);
       if (!senderId) 
       {
         throw new HttpException
         (`senderId not found`, 
         HttpStatus.NOT_FOUND);
         
       }
      
         else if (!discussionId) {
          console.log("discussionIdNot foUND",message.discussionId);
           throw new HttpException(
             `discussionId not found`,
             HttpStatus.NOT_FOUND,
           );
         }
    
         if (message.content==null|| message.content=='') {
        throw new HttpException(
          `content of message is empty !!!`,
          HttpStatus.NOT_FOUND,
        );
      }  

                                                  /*PROCESS */
  

    // verif senderId is parts  in discussionId for send the message 
  
  
const check = await this.discussionsService.checkSenderExisting(message.discussionId,message.senderId);
console.log('check',check);
//console.log("checkkkkkkkkkk",Object.keys(check).length);
//discu existe and part exist in this discu 
if(check && check!=null){
  const newmsj  =  await this.messageService.createmessage(message.senderId,message.discussionId,message.content);
  return response.status(HttpStatus.CREATED).json(newmsj);
}    
else{
  return response.status(HttpStatus.NOT_FOUND).json({message:"Can not post msj "});
  }

  }
                       /////////////////////////////////NewDiscussion///////////////////////////////

  @Post("/add/new")
    async createmessageinNewdiscussion(@Res() response, @Body() message:createMessage) {
      let senderId;
      let receiverId;
      let content;
      let discussionId ;
      const verify = await this.discussionsService.checkdiscussionbetweensenderandreceiver(message.senderId,message.receiverId);
      console.log(verify)
     
      // if null === not part in any discussion
      if(!verify){
        let createNewDiscuAndaddParts : Discussions;
        createNewDiscuAndaddParts = await this.discussionsService.creatediscussion(message.senderId,message.receiverId);
        console.log('"""""""""""""""""',createNewDiscuAndaddParts);
        // recuparation id discu 
        const Msj= await this.messageService.createmessage(senderId,createNewDiscuAndaddParts,content);
      }
        
      else{
        const Msj= await this.messageService.createmessage(senderId,discussionId,content);
       }
    
      }
    }