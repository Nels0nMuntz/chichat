import { IRequest } from "src/shared";

interface IGetAllMessagesQueryString {
    id: string;
    offset: number;
    limit: number;
};

export interface IGetAllMessagesRequest extends IRequest<{}, IGetAllMessagesQueryString> { };