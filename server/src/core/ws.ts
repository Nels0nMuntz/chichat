import { Server as HTTPServer } from "http";
import { WebSocket, Server, MessageEvent } from 'ws';

import { MessageService } from "../services";
import {
    IWSMessage,
    WSMessageTypes,
    IWSMessageActionData,
} from "../models";
import {
    WSMessageManager,
    WSRoomsMap,
    WSClientsMap,
} from "../shared";


export class WebSocketManager {

    private wss: Server;
    private clients: WSClientsMap;
    private rooms: WSRoomsMap;
    private messageService: MessageService;
    private messageManager: WSMessageManager

    constructor(server: HTTPServer) {
        this.wss = new WebSocket.Server({ server });
        this.clients = new WSClientsMap();
        this.rooms = new WSRoomsMap();
        this.messageService = new MessageService();
        this.messageManager = new WSMessageManager();
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
            case WSMessageTypes.INIT_CONNECTED_CLIENT:
                this.messageManager.initClient(actionData);
                break;
            case WSMessageTypes.CREATE_MESSAGE:
                this.messageManager.createMessage(actionData);
                break;
            default:
                break;
        }
    }

    getMessageActionData = (event: MessageEvent): IWSMessageActionData<any> => {
        const parsedData: IWSMessage<any> = JSON.parse(event.data as string);
        return {
            event,
            parsedData,
            clients: this.clients,
            rooms: this.rooms,
            messageService: this.messageService,
        };
    }

}