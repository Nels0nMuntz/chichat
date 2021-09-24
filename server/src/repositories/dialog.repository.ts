import { BaseRepository } from "./base.repository";
import { IDialogDocument, dialogModel } from "../schemas";


export class DialogRepository extends BaseRepository<IDialogDocument> {
    constructor(){
        super(dialogModel)
    }
};