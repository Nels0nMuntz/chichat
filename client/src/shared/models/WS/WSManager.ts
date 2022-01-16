import { IMessageBase, IMessageContent } from "features/home/models";
import { WSMessageTypes, UniqueId, IWSMessage } from "shared";


class WSManager {
    public createTextMessage = (dialogId: UniqueId, userId: UniqueId, message: string ): IWSMessage<IMessageBase> => {
        return {
            type: WSMessageTypes.CREATE_MESSAGE,
            payload:{
                dialogId,
                createdBy: userId,
                content: {
                    text: message, 
                }
            }
        }
    }

    public createMessage = (dialogId: UniqueId, userId: UniqueId, content: IMessageContent ): IWSMessage<IMessageBase> => {
        return {
            type: WSMessageTypes.CREATE_MESSAGE,
            payload: {
                dialogId,
                createdBy: userId,
                content,
            }
        }
    }
};

export const wsManager = new WSManager();