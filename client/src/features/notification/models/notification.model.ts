import { Status } from "shared";

export interface INotification {
    status:Status
    message: string | string[]
    isOpen: boolean
};