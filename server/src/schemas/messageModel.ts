import { Schema, model, Document, Model } from "mongoose";
import { IMessageContent } from "../models/messageModels";
import { IDialogDocument } from "./dialogModel";
import { IUserDocument } from "./userModel";


interface IMessageSchema {
    dialogId: IDialogDocument["_id"];
    createdBy: IUserDocument["_id"];
    read: boolean;
    content: IMessageContent;
    createdAt: string;
    updatedAt: string;
};

export interface IMessageDocument extends IMessageSchema, Document { };

export interface IMessageModel extends Model<IMessageDocument> { };

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
            text: String
        },
    },
    {
        timestamps: true,
    }
);

export const messageModel = model<IMessageDocument>("Message", messageSchema);