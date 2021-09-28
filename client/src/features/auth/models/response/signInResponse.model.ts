import { IUser } from "shared";

export interface ISignInResponse {
    user: IUser
    accessToken: string;
};