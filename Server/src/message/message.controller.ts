import{Controller,Get,HttpStatus,Res,Body,Post,Param} from '@nestjs/common';
import { Message } from './schemas/Message.schema';
import { MessageService } from './message.service';
import { HttpException } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { DiscussionsService } from 'src/discussions/discussions.service';
import { createMessage} from './tdo/createmessage.tdo';
import { Discussions } from 'src/discussions/schemas/discussions.schema';
import { createNewDiscuAndaddParts } from 'src/discussions/tdo/discutdo.tdo';
import { createNewDiscuAndaddPart } from './tdo/createnewdiscuAndaddPartstdo.tdo';
import { clearConfigCache } from 'prettier';
import { async } from 'rxjs';
import { EventsGateway } from 'src/events/events.gateway';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly accountsService: AccountsService,
    private readonly discussionsService: DiscussionsService,
    private readonly ServiceNotif: EventsGateway,
  ) {}
  


  //////////////////////////////////////// 2/return list messages by discussion id xxxx//////////////////////////////////////
  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    console.log('discu id ', id);
    const listemessagesBydiscussion = await this.messageService.getlistmessagesByDiscussionId(id);
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
   let content=message.content; ;
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
    
         else if (message.content==null|| message.content=='') {
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
  let parts = await this.discussionsService.getlistepartsfromdiscussion(message.discussionId)
 const data = {
   newmsj : newmsj,
   parts:parts.parts
 }

  this.ServiceNotif.sendprivatemsj(data);
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
      senderId = await this.accountsService.findaccount(message.senderId);
      receiverId= await this.accountsService.findaccount(message.receiverId);
      if (!senderId) 
       {
         throw new HttpException
         (`senderId not founddd`, 
         HttpStatus.NOT_FOUND);
         
       }
       if (!receiverId) 
       {
         throw new HttpException
         (`receiverId not found`, 
         HttpStatus.NOT_FOUND);
         
       }
      
         if (message.content==null|| message.content=='') {
        throw new HttpException(
          `content of message is empty !!!`,
          HttpStatus.NOT_FOUND,
        );
      }  
      const verify = await this.discussionsService.checkdiscussionbetweensenderandreceiver(message.senderId,message.receiverId);
      console.log('verify',verify)
      //console.log('verify',verify._id);
      // if null === not part in any discussionnnnnnnnnn
      if(!verify){
       
        let createNewDiscuAndaddParts : Discussions;
       createNewDiscuAndaddParts = await this.discussionsService.creatediscussion(message.senderId,message.receiverId);
        console.log('""""""createNewDiscuAndaddParts"""""""""""',createNewDiscuAndaddParts);

        const DiscussionId =createNewDiscuAndaddParts._id;
        console.log('""""""""idddddddddddddddd"""""""""',DiscussionId);
     
        const Msj= await this.messageService.createmessage(message.senderId,DiscussionId,message.content);
        return response.status(HttpStatus.CREATED).json(Msj);
      } 
     
      else{
        const discussionId= verify._id;
        const Msj= await this.messageService.createmessage(message.senderId,discussionId,message.content);
        return response.status(HttpStatus.CREATED).json(Msj);
       }
      }
    }