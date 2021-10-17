import { WebSocket, MessageEvent } from 'ws';

import { MessageService } from '../../../services';
import { CreateMessageRequestDto, MessageResponseDto } from '../../../dtos';
import { ICreateMessageRequest, IMessageResponse } from "../../../models";
import { WSRoomsMap } from '../../../shared';


export enum WSMessageTypes {
    CREATE_MESSAGE = "CREATE_MESSAGE",
    DELETE_MESSAGE = "DELETE_MESSAGE",
};

export interface IWSMessage<T> {
    type: WSMessageTypes;
    payload: T;
};

export interface IMessageActionData<T> {
    event: MessageEvent;
    parsedData: IWSMessage<T>;
    rooms: WSRoomsMap;
    messageService: MessageService
};

interface IWSMessageManager {
    createMessage: (data: IMessageActionData<ICreateMessageRequest>) => Promise<void>;
};

interface IMessageAction {
    doAction: (data: IMessageActionData<any>) => Promise<void>;
};

class CreateMessageAction implements IMessageAction {
    doAction = async (data: IMessageActionData<ICreateMessageRequest>) => {

        const { event, parsedData, rooms, messageService } = data;
        const { dialogId, createdBy } = parsedData.payload;
        debugger
        if (rooms.hasRoom(dialogId)) {
            if(!rooms.hasRoomMember(dialogId, createdBy)){
                rooms.addRoomMember(dialogId, createdBy, event.target);
            };
        }else{
            rooms.addRoom(dialogId, createdBy, event.target);
        };

        try {
            const messageReqDto = new CreateMessageRequestDto(parsedData.payload);
            const messageDocument = await messageService.create(messageReqDto); 
            const messageResDto = new MessageResponseDto(messageDocument);
    
            rooms.broadcast<IMessageResponse>(dialogId, {
                type: WSMessageTypes.CREATE_MESSAGE,
                payload: messageResDto,
            });
        } catch (error) {
            throw error;
        }
    }
};

export class WSMessageManager implements IWSMessageManager {

    private createMessageAction: IMessageAction;

    constructor(){
        this.createMessageAction = new CreateMessageAction();
    }

    createMessage = (data: IMessageActionData<ICreateMessageRequest>) => this.createMessageAction.doAction(data);

};
