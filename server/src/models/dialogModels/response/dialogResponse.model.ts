import { IMessageResponse } from "../../../models/messageModels";
import { IUserResponse } from "../../../models/userModels";

export interface IDialogResponse {
    dialogId: string;
    member: IUserResponse;
    messages: Array<IMessageResponse>;
};