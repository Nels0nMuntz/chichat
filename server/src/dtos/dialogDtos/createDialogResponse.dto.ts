import { IDialogDocument } from "../../schemas";
import { ICreateDialogResponse } from "../../models";

export class CreateDialogResponseDto implements ICreateDialogResponse {

    readonly dialogId:  string;
    readonly member_1:  string;
    readonly member_2:  string;
    readonly messages: any[];

    constructor(doc: IDialogDocument){
        this.dialogId = doc._id;
        this.member_1 = doc.member_1;
        this.member_2 = doc.member_2;
        this.messages = doc.messages;
    }

};