import { Schema, model, Document, Model } from "mongoose";
import { IMessageContent, IMessageAttach } from "../models";
import { IDialogDocument } from "./dialogModel";
import { IUserDocument } from "./userModel";
import { Modify } from "../shared";


interface IMessageSchema {
    dialogId: IDialogDocument["_id"];
    createdBy: IUserDocument["_id"];
    read: boolean;
    content: IMessageContent<IMessageAttach>;
    createdAt: string;
    updatedAt: string;
};

export interface IMessageDocument extends IMessageSchema, Document { };

export type IMessagePopulated = Modify<IMessageDocument, {
    dialogId: IDialogDocument;
    createdBy: IUserDocument;
    read: boolean;
    content: IMessageContent<IMessageAttach>;
    createdAt: string;
    updatedAt: string;
}>;

export interface IMessageModel extends Model<IMessageDocument> { };

const messageAttachSchema = new Schema<IMessageAttach>(
    {
        name: String,
        url: String,
        fileType: {
            type: {
                ext: String,
                mime: String,
            },
        },
        attachType: String,
    },
    {
        timestamps: true,
    }
);

const messageSchema = new Schema<IMessageSchema>(
    {
        dialogId: {
            type: Schema.Types.ObjectId,
            ref: "Dialog",
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
            required: true,
        },
        content: {
            text: {
                type: String,
                required: false,
            },
            attach: {
                type: [messageAttachSchema],
                required: false,
            }
        },
    },
    {
        timestamps: true,
    }
);

export const messageModel = model<IMessageDocument>("Message", messageSchema);