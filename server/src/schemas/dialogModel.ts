import { Schema, model, Document, Model } from "mongoose";
import { Modify } from "../shared";
import { IMessageDocument } from "./messageModel";
import { IUserDocument } from "./userModel";


interface IDialogSchema {
    member_1: IUserDocument["_id"]
    member_2: IUserDocument["_id"]
    messages: Array<IMessageDocument["_id"]>
};

export interface IDialogDocument extends IDialogSchema, Document { };

export type IDialogPopulated = Modify<IDialogDocument, {
    member_1: IUserDocument,
    member_2: IUserDocument,
    messages: Array<IMessageDocument>,
}>;

export interface IDialogModel extends Model<IDialogDocument> { };

const dialogSchema = new Schema<IDialogSchema>(
    {
        member_1: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        member_2: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        messages: [
            { 
                type: Schema.Types.ObjectId,
                ref: "Message",
            }
        ]
    },
    {
        timestamps: true,
    }
);

export const dialogModel = model<IDialogDocument>("Dialog", dialogSchema);