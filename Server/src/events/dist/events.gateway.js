"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.EventsGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var common_1 = require("@nestjs/common");
var users = [];
var addspecificUser = function (accountId, socketId) {
    console.log("//////////////////////", accountId, socketId);
    !users.some(function (account) { return account.accountId === accountId; }) &&
        users.push({ accountId: accountId, socketId: socketId });
};
var getSpecificUser = function (accountId) {
    return users.find(function (account) { return account.accountId === accountId; });
};
var removeUser = function (socketId) {
    users = users.filter(function (account) { return account.socketId !== socketId; });
};
var EventsGateway = /** @class */ (function () {
    function EventsGateway() {
        this.logger = new common_1.Logger('MessageGateway');
    }
    EventsGateway.prototype.afterInit = function (server) {
        return this.logger.log('Init');
    };
    EventsGateway.prototype.handleDisconnect = function (client) {
        //return this.logger.log(`Client disconnected: ${client.id}`);
        console.log("*********************socketId****************", client.id);
        removeUser(client.id);
        //this.server.emit("getnewUsers",users);
        console.log("*********************newUsers****************", users);
    };
    EventsGateway.prototype.handleConnection = function (client) {
        return this.logger.log("Client connected: " + client.id);
        //return this.server.emit(client.id);
        //return client.emit('addUser', client.id);   
    };
    EventsGateway.prototype.addnotif = function (data) {
        return this.server.emit('events', data);
    };
    EventsGateway.prototype.addUser = function (data, client) {
        console.log("*********************accountId****************", data);
        addspecificUser(data.accountId, client.id);
        console.log("*********************ListeUsers****************", users);
        //return this.server.to("dD8CjUwMRSqPlmPJAAAC").emit('events', data);
    };
    EventsGateway.prototype.sendprivatemsj = function (data, senderId) {
        var _this = this;
        console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrssssss", users);
        console.log("parts", data.parts);
        return data.parts.map(function (p) {
            var userpart = getSpecificUser(p);
            console.log("userpart", userpart);
            if (userpart.accountId !== senderId) {
                return _this.server.to(userpart.socketId).emit("events", data);
                // refresh liste msjs 
            }
        });
    };
    EventsGateway.prototype.handleEventid = function (client, data) {
        console.log("client", client.id);
        return client.id;
    };
    __decorate([
        websockets_1.WebSocketServer()
    ], EventsGateway.prototype, "server");
    __decorate([
        websockets_1.SubscribeMessage('events'),
        __param(0, websockets_1.MessageBody())
    ], EventsGateway.prototype, "addnotif");
    __decorate([
        websockets_1.SubscribeMessage('addUser'),
        __param(0, websockets_1.MessageBody()), __param(1, websockets_1.ConnectedSocket())
    ], EventsGateway.prototype, "addUser");
    __decorate([
        websockets_1.SubscribeMessage('sendprivatemsj')
    ], EventsGateway.prototype, "sendprivatemsj");
    __decorate([
        websockets_1.SubscribeMessage('getid')
    ], EventsGateway.prototype, "handleEventid");
    EventsGateway = __decorate([
        websockets_1.WebSocketGateway({
            cors: {
                origin: '*'
            }
        })
    ], EventsGateway);
    return EventsGateway;
}());
exports.EventsGateway = EventsGateway;
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
