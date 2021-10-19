import { IWSMessageActionData } from "./wsMessageActionData.model";

export interface IWSMessageAction {
    doAction: (data: IWSMessageActionData<any>) => Promise<void>;
};

export interface IWSMessageActionSync {
    doAction: (data: IWSMessageActionData<any>) => void;
};