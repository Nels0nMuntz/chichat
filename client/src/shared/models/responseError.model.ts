import { ErrorCode } from "shared/constants/errorCode";

export interface ResponseError<T = {}> extends Error{
    status: number
    code: ErrorCode
    message: string
    metaData: T
};