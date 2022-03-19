import { WebSocket } from "ws";
import { MessageService } from "./";
import { DialogRepository } from "../repositories";
import {
    ICreateMessageRequest,
    IInitWSClientRequest,
    IMessageResponse,
    IWSMessage,
    IWSMessageActionData,
    WSMessageTypes,
    UniqueId,
    IDeleteMessagesRequest,
} from "../models";
import { CreateMessageRequestDto, MessageResponseDto } from "../dtos";
import { WSClientsMap,  } from '../shared';


export class WSService {

    private clients: WSClientsMap;
    private dialogRepository: DialogRepository;
    private messageService: MessageService;

    constructor() {
        this.clients = new WSClientsMap();
        this.dialogRepository = new DialogRepository();
        this.messageService = new MessageService();
    }

    initClient = async (data: IWSMessageActionData<IInitWSClientRequest>) => {
        const userId = data.parsedData.payload.userId;
        const socket = data.event.target;       
        this.clients.setClient(userId, socket);
    }

    createMessage = async (data: IWSMessageActionData<ICreateMessageRequest>) => {
        const { parsedData } = data;
        try {
            const messageReqDto = new CreateMessageRequestDto(parsedData.payload);
            const messageDocument = await this.messageService.create(messageReqDto); 
            const messageResDto = new MessageResponseDto(messageDocument);
            const message: IWSMessage<IMessageResponse> = {
                type: WSMessageTypes.CREATE_MESSAGE,
                payload: messageResDto,
            };
            this.broadcast(parsedData.payload.dialogId, message);
        } catch (error) {
            throw error;
        }
    }

    deleteMessages = async (data: IWSMessageActionData<IDeleteMessagesRequest>) => {
        const { dialogId, messageIds } = data.parsedData.payload;
        try {
            await this.messageService.delete(messageIds);
            const message: IWSMessage<IDeleteMessagesRequest> = {
                type: WSMessageTypes.DELETE_MESSAGE,
                payload: { dialogId, messageIds },
            };
            this.broadcast(dialogId, message);
        } catch (error: any) {
            throw error;
        }
    }

    private sendMessage = (socket: WebSocket, message: IWSMessage<any>) => {
        if(socket && socket.readyState === 1){
            const json = JSON.stringify(message);
            socket.send(json);
        };
    }

    private broadcast = async (dialogId: string, message: IWSMessage<any>) => {
        try {
            const dialog = await (await this.dialogRepository.findById(dialogId)).populate("member_1 member_2")
            const { member_1, member_2 } = dialog;
            const client_1 = this.clients.getClient(member_1.id);
            const client_2 = this.clients.getClient(member_2.id);
            this.sendMessage(client_1, message);
            this.sendMessage(client_2, message);
        } catch (error) {
            console.log(error);
        };
    }

};