import { BaseRepository } from "./base.repository";
import { IMessageDocument, messageModel } from "../schemas";


export class MessageRepository extends BaseRepository<IMessageDocument>{
    constructor(){
        super(messageModel)
    }
};