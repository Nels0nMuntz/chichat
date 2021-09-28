import { IUserResponse } from "../../../models/userModels";

export interface IAuthSignInResponse {
    user: IUserResponse
    accessToken: string
};