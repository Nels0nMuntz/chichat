"use strict";
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
exports.WSService = void 0;
var _1 = require("./");
var repositories_1 = require("../repositories");
var models_1 = require("../models");
var dtos_1 = require("../dtos");
var shared_1 = require("../shared");
var WSService = (function () {
    function WSService() {
        var _this = this;
        this.initClient = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var userId, socket;
            return __generator(this, function (_a) {
                userId = data.parsedData.payload.userId;
                socket = data.event.target;
                this.clients.setClient(userId, socket);
                return [2];
            });
        }); };
        this.createMessage = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var parsedData, messageReqDto, messageDocument, messageResDto, message, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parsedData = data.parsedData;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        messageReqDto = new dtos_1.CreateMessageRequestDto(parsedData.payload);
                        return [4, this.messageService.create(messageReqDto)];
                    case 2:
                        messageDocument = _a.sent();
                        messageResDto = new dtos_1.MessageResponseDto(messageDocument);
                        message = {
                            type: models_1.WSMessageTypes.CREATE_MESSAGE,
                            payload: messageResDto,
                        };
                        this.broadcast(parsedData.payload.dialogId, message);
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2];
                }
            });
        }); };
        this.deleteMessages = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var _a, dialogId, messageIds, message, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = data.parsedData.payload, dialogId = _a.dialogId, messageIds = _a.messageIds;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.messageService.delete(messageIds)];
                    case 2:
                        _b.sent();
                        message = {
                            type: models_1.WSMessageTypes.DELETE_MESSAGE,
                            payload: { dialogId: dialogId, messageIds: messageIds },
                        };
                        this.broadcast(dialogId, message);
                        return [3, 4];
                    case 3:
                        error_2 = _b.sent();
                        throw error_2;
                    case 4: return [2];
                }
            });
        }); };
        this.sendMessage = function (socket, message) {
            if (socket && socket.readyState === 1) {
                var json = JSON.stringify(message);
                socket.send(json);
            }
            ;
        };
        this.broadcast = function (dialogId, message) { return __awaiter(_this, void 0, void 0, function () {
            var dialog, member_1, member_2, client_1, client_2, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.dialogRepository.findById(dialogId)];
                    case 1: return [4, (_a.sent()).populate("member_1 member_2")];
                    case 2:
                        dialog = _a.sent();
                        member_1 = dialog.member_1, member_2 = dialog.member_2;
                        client_1 = this.clients.getClient(member_1.id);
                        client_2 = this.clients.getClient(member_2.id);
                        this.sendMessage(client_1, message);
                        this.sendMessage(client_2, message);
                        return [3, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3, 4];
                    case 4:
                        ;
                        return [2];
                }
            });
        }); };
        this.clients = new shared_1.WSClientsMap();
        this.dialogRepository = new repositories_1.DialogRepository();
        this.messageService = new _1.MessageService();
    }
    return WSService;
}());
exports.WSService = WSService;
;
//# sourceMappingURL=ws.service.js.map