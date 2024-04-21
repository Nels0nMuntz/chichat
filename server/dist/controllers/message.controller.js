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
exports.MessageController = void 0;
var dtos_1 = require("../dtos");
var message_service_1 = require("../services/message.service");
var shared_1 = require("../shared");
var MessageController = (function () {
    function MessageController() {
        var _this = this;
        this.create = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var messageReqDto, doc, messageResDto, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        messageReqDto = new dtos_1.CreateMessageRequestDto(req.body);
                        return [4, this.service.create(messageReqDto)];
                    case 1:
                        doc = _a.sent();
                        if (!doc) {
                            throw shared_1.ErrorException.BadRequestError("Invalid message data");
                        }
                        messageResDto = new dtos_1.MessageResponseDto(doc);
                        return [2, res.status(201).json(__assign({}, messageResDto))];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); };
        this.update = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var messageReqDto, doc, messageResData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        messageReqDto = new dtos_1.UpdateMessageRequestDto(req.body);
                        return [4, this.service.update(messageReqDto)];
                    case 1:
                        doc = _a.sent();
                        if (!doc) {
                            throw shared_1.ErrorException.BadRequestError("Invalid message data");
                        }
                        ;
                        messageResData = new dtos_1.MessageResponseDto(doc);
                        res.status(200).json(__assign({}, messageResData));
                        return [3, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); };
        this.search = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var request, userId, query;
            return __generator(this, function (_a) {
                try {
                    request = req;
                    userId = req.user.id;
                    query = request.query.query;
                }
                catch (error) {
                }
                return [2];
            });
        }); };
        this.getMessages = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var request, _a, dialogId, page, limit, _b, messages, hasMore, messagesRes, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        request = req;
                        _a = request.query, dialogId = _a.dialogId, page = _a.page, limit = _a.limit;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, this.service.getMessages(dialogId, {
                                page: +page,
                                limit: +limit,
                            })];
                    case 2:
                        _b = _c.sent(), messages = _b.messages, hasMore = _b.hasMore;
                        messagesRes = messages.map(function (message) { return new dtos_1.MessageResponseDto(message); });
                        return [2, res.status(200).json({ messages: messagesRes, hasMore: hasMore })];
                    case 3:
                        error_3 = _c.sent();
                        next(error_3);
                        return [3, 4];
                    case 4:
                        ;
                        return [2];
                }
            });
        }); };
        this.service = new message_service_1.MessageService();
    }
    return MessageController;
}());
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map