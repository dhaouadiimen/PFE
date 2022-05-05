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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MessageController = void 0;
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var MessageController = /** @class */ (function () {
    function MessageController(messageService, accountsService, discussionsService, ServiceNotif) {
        this.messageService = messageService;
        this.accountsService = accountsService;
        this.discussionsService = discussionsService;
        this.ServiceNotif = ServiceNotif;
    }
    //////////////////////////////////////// 2/return list messages by discussion id xxxx//////////////////////////////////////
    MessageController.prototype.findById = function (response, id) {
        return __awaiter(this, void 0, void 0, function () {
            var listemessagesBydiscussion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('discu id ', id);
                        return [4 /*yield*/, this.messageService.getlistmessagesByDiscussionId(id)];
                    case 1:
                        listemessagesBydiscussion = _a.sent();
                        return [2 /*return*/, response.status(common_1.HttpStatus.OK).json({
                                listemessagesBydiscussion: listemessagesBydiscussion
                            })];
                }
            });
        });
    };
    MessageController.prototype.createmessageinExistingdiscussion = function (response, message) {
        return __awaiter(this, void 0, void 0, function () {
            var senderId, discussionId, content, check, newmsj, parts, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = message.content;
                        return [4 /*yield*/, this.accountsService.findaccount(message.senderId)];
                    case 1:
                        // DATA VERIFICATION
                        //search senderId exist in accounts or no
                        senderId = _a.sent();
                        return [4 /*yield*/, this.discussionsService.finddiscu(message.discussionId)];
                    case 2:
                        discussionId = _a.sent();
                        console.log("discuId", message.discussionId);
                        if (!senderId) {
                            throw new common_2.HttpException("senderId not found", common_1.HttpStatus.NOT_FOUND);
                        }
                        else if (!discussionId) {
                            console.log("discussionIdNot foUND", message.discussionId);
                            throw new common_2.HttpException("discussionId not found", common_1.HttpStatus.NOT_FOUND);
                        }
                        else if (message.content == null || message.content == '') {
                            throw new common_2.HttpException("content of message is empty !!!", common_1.HttpStatus.NOT_FOUND);
                        }
                        return [4 /*yield*/, this.discussionsService.checkSenderExisting(message.discussionId, message.senderId)];
                    case 3:
                        check = _a.sent();
                        console.log('check', check);
                        if (!(check && check != null)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.messageService.createmessage(message.senderId, message.discussionId, message.content)];
                    case 4:
                        newmsj = _a.sent();
                        return [4 /*yield*/, this.discussionsService.getlistepartsfromdiscussion(message.discussionId)];
                    case 5:
                        parts = _a.sent();
                        data = {
                            newmsj: newmsj,
                            parts: parts.parts
                        };
                        this.ServiceNotif.sendprivatemsj(data, message.senderId);
                        return [2 /*return*/, response.status(common_1.HttpStatus.CREATED).json(newmsj)];
                    case 6: return [2 /*return*/, response.status(common_1.HttpStatus.NOT_FOUND).json({ message: "Can not post msj " })];
                }
            });
        });
    };
    /////////////////////////////////NewDiscussion///////////////////////////////
    MessageController.prototype.createmessageinNewdiscussion = function (response, message) {
        return __awaiter(this, void 0, void 0, function () {
            var senderId, receiverId, content, discussionId, verify, createNewDiscuAndaddParts_1, DiscussionId, Msj, discussionId_1, Msj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountsService.findaccount(message.senderId)];
                    case 1:
                        senderId = _a.sent();
                        return [4 /*yield*/, this.accountsService.findaccount(message.receiverId)];
                    case 2:
                        receiverId = _a.sent();
                        if (!senderId) {
                            throw new common_2.HttpException("senderId not founddd", common_1.HttpStatus.NOT_FOUND);
                        }
                        if (!receiverId) {
                            throw new common_2.HttpException("receiverId not found", common_1.HttpStatus.NOT_FOUND);
                        }
                        if (message.content == null || message.content == '') {
                            throw new common_2.HttpException("content of message is empty !!!", common_1.HttpStatus.NOT_FOUND);
                        }
                        return [4 /*yield*/, this.discussionsService.checkdiscussionbetweensenderandreceiver(message.senderId, message.receiverId)];
                    case 3:
                        verify = _a.sent();
                        console.log('verify', verify);
                        if (!!verify) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.discussionsService.creatediscussion(message.senderId, message.receiverId)];
                    case 4:
                        createNewDiscuAndaddParts_1 = _a.sent();
                        console.log('""""""createNewDiscuAndaddParts"""""""""""', createNewDiscuAndaddParts_1);
                        DiscussionId = createNewDiscuAndaddParts_1._id;
                        console.log('""""""""idddddddddddddddd"""""""""', DiscussionId);
                        return [4 /*yield*/, this.messageService.createmessage(message.senderId, DiscussionId, message.content)];
                    case 5:
                        Msj = _a.sent();
                        return [2 /*return*/, response.status(common_1.HttpStatus.CREATED).json(Msj)];
                    case 6:
                        discussionId_1 = verify._id;
                        return [4 /*yield*/, this.messageService.createmessage(message.senderId, discussionId_1, message.content)];
                    case 7:
                        Msj = _a.sent();
                        return [2 /*return*/, response.status(common_1.HttpStatus.CREATED).json(Msj)];
                }
            });
        });
    };
    __decorate([
        common_1.Get('/:id'),
        __param(0, common_1.Res()), __param(1, common_1.Param('id'))
    ], MessageController.prototype, "findById");
    __decorate([
        common_1.Post("/add"),
        __param(0, common_1.Res()), __param(1, common_1.Body())
    ], MessageController.prototype, "createmessageinExistingdiscussion");
    __decorate([
        common_1.Post("/add/new"),
        __param(0, common_1.Res()), __param(1, common_1.Body())
    ], MessageController.prototype, "createmessageinNewdiscussion");
    MessageController = __decorate([
        common_1.Controller('message')
    ], MessageController);
    return MessageController;
}());
exports.MessageController = MessageController;
