import { Server as HTTPServer } from "http";
import { WebSocket, Server, MessageEvent } from 'ws';

import { WSService } from "../services";
import {
    IWSMessage,
    WSMessageTypes,
    IWSMessageActionData,
} from "../models";


export class WebSocketManager {

    private wss: Server;
    private WSService: WSService;

    constructor(server: HTTPServer) {
        this.wss = new WebSocket.Server({ server });
        this.WSService = new WSService();
    }

    init() {
        this.wss.on("connection", this.onConnectionHandler);
    }

    onConnectionHandler = (ws: WebSocket) => {
        console.log('client connected to the socket');
        ws.onmessage = this.onMessageHandler;
    }

    onMessageHandler = (event: MessageEvent) => {
        const actionData = this.getMessageActionData(event);
        switch (actionData.parsedData.type) {
            case WSMessageTypes.SET_CLIENT_CONNECTION:
                this.WSService.initClient(actionData);
                break;
            case WSMessageTypes.CREATE_MESSAGE:
                this.WSService.createMessage(actionData);
                break;
            case WSMessageTypes.DELETE_MESSAGE:
                this.WSService.deleteMessages(actionData);
            default:
                break;
        }
    }

    getMessageActionData = (event: MessageEvent): IWSMessageActionData<any> => {
        const parsedData: IWSMessage<any> = JSON.parse(event.data as string);
        return {
            event,
            parsedData,
        };
    }

}