import { IMessage, IMessageAttach, IMessageContent, IMessageResponse } from "features/home/models";
import { UniqueId, Status } from "shared";

export class MessageDto implements IMessage {

    messageId: UniqueId;
    dialogId: UniqueId;
    createdBy: UniqueId;
    createdAt: string;
    updatedAt: string;
    content: IMessageContent<IMessageAttach>;
    read: boolean;
    selected: boolean;

    constructor(message: IMessageResponse) {
        this.dialogId = message.dialogId;
        this.messageId = message.messageId;
        this.createdBy = message.createdBy;
        this.createdAt = message.createdAt;
        this.content = {
            text: message.content.text,
            attach: message.content.attach && message.content.attach.map((attachItem) => ({
                attachId: attachItem.attachId,
                url: attachItem.url,
                name: attachItem.name,
                file: {
                    status: Status.Initial,
                },
                fileType: {
                    ext: attachItem.fileType.ext,
                    mime: attachItem.fileType.mime,
                },
                attachType: attachItem.attachType,
                createdAt: attachItem.createdAt,
                updatedAt: attachItem.updatedAt,
            })),
        };
        this.read = message.read;
        this.updatedAt = message.updatedAt;
        this.selected = false;
    }
};