import { ICreateDialogRequest } from "../../models";


export class CreateDialogRequestDto implements ICreateDialogRequest {
    
    member_1: string;
    member_2: string;

    constructor(dialog: ICreateDialogRequest){
        this.member_1 = dialog.member_1;
        this.member_2 = dialog.member_2;
    }
};