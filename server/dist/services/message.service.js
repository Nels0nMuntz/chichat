"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
var repositories_1 = require("../repositories");
var shared_1 = require("../shared");
var MessageService = (function () {
    function MessageService() {
        var _this = this;
        this.create = function (doc) { return __awaiter(_this, void 0, void 0, function () {
            var dialogId, createdBy, dialog, user, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dialogId = doc.dialogId, createdBy = doc.createdBy;
                        return [4, this.dialogRepository.findById(dialogId)];
                    case 1:
                        dialog = _a.sent();
                        if (!dialog) {
                            throw shared_1.ErrorException.BadRequestError("Invalid message data. Can not find dialog in DB");
                        }
                        ;
                        return [4, this.userRepository.findById(createdBy)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            throw shared_1.ErrorException.BadRequestError("Invalid message data. Can not find user in DB");
                        }
                        ;
                        return [4, this.messageRepository.createOne(__assign({}, doc))];
                    case 3:
                        message = _a.sent();
                        this.dialogRepository.updateOne(dialogId, { $push: { messages: message._id } });
                        return [2, message];
                }
            });
        }); };
        this.update = function (doc) { return __awaiter(_this, void 0, void 0, function () {
            var messageId, content, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageId = doc.messageId, content = doc.content;
                        return [4, this.messageRepository.findById(messageId)];
                    case 1:
                        message = _a.sent();
                        if (!message) {
                            throw shared_1.ErrorException.BadRequestError("Invalid message data. Can not find message in DB");
                        }
                        ;
                        return [4, this.messageRepository.updateOne(messageId, { content: content })];
                    case 2: return [2, _a.sent()];
                }
            });
        }); };
        this.search = function (userId, query) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        }); };
        this.getMessages = function (dialogId, options) { return __awaiter(_this, void 0, void 0, function () {
            var dialog, allMessages, limitedMessages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.dialogRepository.findById(dialogId)];
                    case 1:
                        dialog = _a.sent();
                        if (!dialog) {
                            throw shared_1.ErrorException.BadRequestError("Can not find dialog by ID in DB");
                        }
                        ;
                        return [4, this.messageRepository.find({ dialogId: dialogId })];
                    case 2:
                        allMessages = _a.sent();
                        return [4, this.messageRepository.find({ dialogId: dialogId }, null, {
                                sort: { createdAt: -1 },
                                limit: options.limit,
                                skip: options.limit * (options.page - 1),
                            })];
                    case 3:
                        limitedMessages = _a.sent();
                        return [2, {
                                messages: limitedMessages,
                                hasMore: allMessages.length > options.page * options.limit,
                            }];
                }
            });
        }); };
        this.delete = function (messageIds) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.messageRepository.delete(messageIds)];
                    case 1: return [2, _a.sent()];
                }
            });
        }); };
        this.messageRepository = new repositories_1.MessageRepository();
        this.dialogRepository = new repositories_1.DialogRepository();
        this.userRepository = new repositories_1.UserRepository();
    }
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map