import { IMessageStore, IMessageContent, IMessageResponse, IMessageAttachStore } from "features/home/models";
import { UniqueId, Status } from "shared";

export class MessageDto implements IMessageStore {

    messageId: UniqueId;
    dialogId: UniqueId;
    createdBy: UniqueId;
    createdAt: string;
    updatedAt: string;
    content: IMessageContent<IMessageAttachStore>;
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
                status: Status.Initial,
                url: attachItem.url,
                name: attachItem.name,
                file: {},
                fileType: {
                    ext: attachItem.fileType.ext,
                    mime: attachItem.fileType.mime,
                },
                attachType: attachItem.attachType,
                playable: attachItem.attachType === 'video' || attachItem.attachType === 'voice',
                createdAt: attachItem.createdAt,
                updatedAt: attachItem.updatedAt,
            })),
        };
        this.read = message.read;
        this.updatedAt = message.updatedAt;
        this.selected = false;
    }
};