import { MessageEvent } from 'ws';

import { MessageService } from "../../../services";
import { WSRoomsMap, WSClientsMap } from "../../../shared";
import { IWSMessage } from "./wsMessage.model";

export interface IWSMessageActionData<T> {
    event: MessageEvent;
    parsedData: IWSMessage<T>;
    clients: WSClientsMap
    rooms: WSRoomsMap;
    messageService: MessageService;
};