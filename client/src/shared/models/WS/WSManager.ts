import { IMessageBase } from "features/home/models";
import { WSMessageTypes, UniqueId, IWSMessage } from "shared";


class WSManager {
    public createTextMessage = (dialogId: UniqueId, userId: UniqueId, message: string ): IWSMessage<IMessageBase> => {
        return {
            type: WSMessageTypes.CREATE_MESSAGE,
            payload:{
                dialogId,
                createdBy: userId,
                content: {
                    type: "text",
                    text: message,
                }
            }
        }
    }
};

export const wsManager = new WSManager();