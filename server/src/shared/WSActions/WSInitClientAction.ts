import { IInitWSClientRequest, IWSMessageActionData, IWSMessageActionSync } from "../../models";


export class WSInitClientAction implements IWSMessageActionSync {
    doAction = (data: IWSMessageActionData<IInitWSClientRequest>) => {
        const userId = data.parsedData.payload.userId;
        const socket = data.event.target
        const clients = data.clients;        
        clients.setClient(userId, socket);
    }
};