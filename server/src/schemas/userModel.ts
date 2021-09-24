import { Schema, model, Document, Model } from "mongoose";

export interface IUserSchema {
    email: string
    firstName: string
    lastName?: string
    phoneNumber: string
    password: string
    passwordOrigin: string
    isActivated: boolean
    activationId: string
};

export interface IUserDocument extends Document, IUserSchema { };

export interface IUserModel extends Model<IUserDocument> { };

const userSchema = new Schema<IUserSchema>({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordOrigin: {
        type: String,
        required: true,
    },
    isActivated: {
        type: Boolean,
        default: false,
        required: true,
    },
    activationId: {
        type: String,
        required: true,
    }
});

export const userModel = model<IUserDocument>("User", userSchema);