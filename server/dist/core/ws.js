"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketManager = void 0;
var ws_1 = require("ws");
var services_1 = require("../services");
var models_1 = require("../models");
var WebSocketManager = (function () {
    function WebSocketManager(server) {
        var _this = this;
        this.onConnectionHandler = function (ws) {
            console.log('client connected to the socket');
            ws.onmessage = _this.onMessageHandler;
        };
        this.onMessageHandler = function (event) {
            var actionData = _this.getMessageActionData(event);
            switch (actionData.parsedData.type) {
                case models_1.WSMessageTypes.SET_CLIENT_CONNECTION:
                    _this.WSService.initClient(actionData);
                    break;
                case models_1.WSMessageTypes.CREATE_MESSAGE:
                    _this.WSService.createMessage(actionData);
                    break;
                case models_1.WSMessageTypes.DELETE_MESSAGE:
                    _this.WSService.deleteMessages(actionData);
                default:
                    break;
            }
        };
        this.getMessageActionData = function (event) {
            var parsedData = JSON.parse(event.data);
            return {
                event: event,
                parsedData: parsedData,
            };
        };
        this.wss = new ws_1.WebSocket.Server({ server: server });
        this.WSService = new services_1.WSService();
    }
    WebSocketManager.prototype.init = function () {
        this.wss.on("connection", this.onConnectionHandler);
    };
    return WebSocketManager;
}());
exports.WebSocketManager = WebSocketManager;
//# sourceMappingURL=ws.js.map