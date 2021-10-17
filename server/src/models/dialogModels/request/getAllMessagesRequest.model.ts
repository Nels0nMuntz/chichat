import { IRequest } from "src/shared";

export interface IGetAllMessagesQueryString {
    id: string;
    offset: number;
    limit: number;
};

export interface IGetAllMessagesRequest extends IRequest<{}, IGetAllMessagesQueryString> { };