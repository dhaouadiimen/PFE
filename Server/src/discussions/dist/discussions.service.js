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
exports.DiscussionsService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var discussions_schema_1 = require("./schemas/discussions.schema");
var DiscussionsService = /** @class */ (function () {
    function DiscussionsService(discussionModel) {
        this.discussionModel = discussionModel;
    }
    DiscussionsService.prototype.creatediscussion = function (senderId, receiverId) {
        return __awaiter(this, void 0, Promise, function () {
            var parts;
            return __generator(this, function (_a) {
                parts = [senderId, receiverId];
                return [2 /*return*/, this.discussionModel.create({ parts: parts })];
            });
        });
    };
    DiscussionsService.prototype.finddiscu = function (discussionId) {
        return __awaiter(this, void 0, Promise, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('**********discussionId*************', discussionId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.discussionModel.findOne({ _id: discussionId }).exec()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DiscussionsService.prototype.getListeDiscuByAccountid = function (accountId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.discussionModel.find({
                            /* parts:{$in:[accountId]}, */
                            parts: { $in: accountId }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DiscussionsService.prototype.checkSenderExisting = function (discussionId, senderId) {
        return __awaiter(this, void 0, Promise, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('discuuuuuuuuuuuuuuuuuuuuuuuuuuuu', discussionId);
                        return [4 /*yield*/, this.discussionModel.findOne({ parts: { $in: senderId }, _id: discussionId }).exec()];
                    case 1:
                        a = _a.sent();
                        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", a);
                        return [2 /*return*/, a];
                }
            });
        });
    };
    DiscussionsService.prototype.checkdiscussionbetweensenderandreceiver = function (senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.discussionModel.findOne({ $and: [{ parts: { $in: senderId } }, { parts: { $in: receiverId } }] })
                            .exec()];
                    case 1:
                        a = _a.sent();
                        return [2 /*return*/, a];
                }
            });
        });
    };
    DiscussionsService.prototype.getlistepartsfromdiscussion = function (discussionId) {
        return __awaiter(this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.discussionModel.findOne({ _id: discussionId })
                            .exec()];
                    case 1:
                        a = _a.sent();
                        return [2 /*return*/, a];
                }
            });
        });
    };
    DiscussionsService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(discussions_schema_1.Discussions.name))
    ], DiscussionsService);
    return DiscussionsService;
}());
exports.DiscussionsService = DiscussionsService;
/*   async creatediscussion((senderID: Accounts, recieverID: Accounts, content: Object)): Promise<Discussions> {
      const newDiscussions = new this.discussionModel(discussions);
      return newDiscussions.save()
  } */
/* async readAll(): Promise<Discussions[]> {
    return this.discussionModel.find().exec();
}
 */
