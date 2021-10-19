import { WSCreateMessageAction } from '../WSActions/WSCreateMessageAction';
import { WSInitClientAction } from "../WSActions/WSInitClientAction";
import { 
    ICreateMessageRequest, 
    IWSMessageActionData,
    IInitWSClientRequest,
} from "../../models";


interface IWSMessageManager {
    initClient: (data: IWSMessageActionData<IInitWSClientRequest>) => void;
    createMessage: (data: IWSMessageActionData<ICreateMessageRequest>) => Promise<void>;
};

export class WSMessageManager implements IWSMessageManager {

    private initClientAction: WSInitClientAction
    private createMessageAction: WSCreateMessageAction;

    constructor(){
        this.initClientAction = new WSInitClientAction();
        this.createMessageAction = new WSCreateMessageAction();
    }

    initClient = (data: IWSMessageActionData<IInitWSClientRequest>) => this.initClientAction.doAction(data);

    createMessage = (data: IWSMessageActionData<ICreateMessageRequest>) => this.createMessageAction.doAction(data);

};
