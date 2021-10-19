import { IWSMessage } from "shared";

export interface IInitWSClientRequest extends IWSMessage<{ userId: string }> { };