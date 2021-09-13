import { model, Schema, Document, Model } from "mongoose";


export interface ITokenSchema {
    userId: string
    refreshToken: string
};

export interface ITokenDocument extends ITokenSchema, Document { };

export interface ITokenModel extends Model<ITokenDocument> { };

const TokenSchema = new Schema<ITokenSchema>({
    userId: {
        type: String,
        ref: "User",
    },
    refreshToken: {
        type: String,
        required: true,
    }
});

export const tokenModel: ITokenModel = model<ITokenDocument>("Token", TokenSchema);