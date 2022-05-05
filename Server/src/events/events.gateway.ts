import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  MessageBody,
  ConnectedSocket
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Server } from 'ws';
import { AddUserConnectTdo } from './TDO/AddUserConnectTdo';
import { AccountsSchema } from 'src/accounts/schemas/accounts.schema';
import { createContext } from "react";
import { MessageController } from '../message/message.controller';
import { Message } from 'src/message/schemas/Message.schema';
//export const AuthContext = createContext(account);
let users = [];

const addspecificUser = (accountId, socketId) => {
  console.log("//////////////////////",accountId,socketId);
  !users.some((account) => account.accountId === accountId) &&
    users.push({ accountId, socketId });
};

const getSpecificUser = (accountId) => {
  return users.find((account) => account.accountId === accountId);
};
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class EventsGateway  {
  @WebSocketServer()

  server: Server;
   private logger: Logger = new Logger('MessageGateway');
   public afterInit(server: Server): void {
    return this.logger.log('Init');
  }
  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): any {
      return this.logger.log(`Client connected: ${client.id}`);
     //return this.server.emit(client.id);
     //return client.emit('addUser', client.id);   
  }
  @SubscribeMessage('events')
  addnotif(@MessageBody() data: any): Observable<WsResponse<number>> {
   return this.server.emit('events', data);
    //return this.server.to("dD8CjUwMRSqPlmPJAAAC").emit('events', data);
  }


  @SubscribeMessage('addUser')
  addUser(@MessageBody() data : AddUserConnectTdo , @ConnectedSocket() client:Socket): void {
    console.log("*********************accountId****************",data);
    addspecificUser(data.accountId,client.id)
    //return this.server.to("dD8CjUwMRSqPlmPJAAAC").emit('events', data);
  }
  @SubscribeMessage('sendprivatemsj')
  sendprivatemsj(data: any, senderId : string): void {
   console.log("sendeeeeeeeeer",senderId)
    console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrssssss",users);
    console.log("parts",data.parts);
    return data.parts.map(p=>
      {
     const userpart= getSpecificUser(p);
     console.log("userpart",userpart);
     console.log("userpart.accountId",userpart.accountId)
     console.log("senderId",senderId)
      if (userpart.accountId!==senderId){
        return this.server.to(userpart.socketId).emit("events",data);
       }
    })
  }

/* @SubscribeMessage('getid')
handleEventid(client: Socket, data: string): string {
  console.log("client",client.id)
  return client.id;
} */


/* 
  @SubscribeMessage('events')
  handleEvent(client: Socket, data: string): string
  {
    console.log("testttttttttttttttttttttt",data)
    return data 
    
  } */



  /* 
   @SubscribeMessage('msgToServer')
  public handleMessage(client: Socket, payload: any): Promise<WsResponse<any>> {
    return this.server.to(payload.room).emit('msgToClient', payload);
  }

  @SubscribeMessage('joinRoom')
  public joinRoom(client: Socket, room: string): void {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  public leaveRoom(client: Socket, room: string): void {
    client.leave(room);
    client.emit('leftRoom', room);
  } */

  

}