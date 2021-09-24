import { Schema, model, Document, Model } from "mongoose";
import { IMessageDocument } from "./messageModel";
import { IUserDocument } from "./userModel";


interface IDialogSchema {
    member_1: IUserDocument["_id"]
    member_2: IUserDocument["_id"]
    messages: Array<IMessageDocument["_id"]>
};

export interface IDialogDocument extends IDialogSchema, Document { };

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
        messages: [Schema.Types.ObjectId]
    },
    {
        timestamps: true,
    }
);

export const dialogModel = model<IDialogDocument>("Dialog", dialogSchema);