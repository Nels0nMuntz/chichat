import { NextFunction, Response } from "express";
import { IDialogDocument } from "../schemas";
import { CreateDialogRequestDto, CreateDialogResponseDto } from "../dtos";
import { ICreateDialogRequest, ICreateDialogResponse } from "../models";
import { DialogService } from "../services/dialog.service";
import { ErrorException, IRequest } from "../shared";


export class DialogController {

    private service: DialogService;

    constructor(){
        this.service = new DialogService();
    }

    create = async (req: IRequest<ICreateDialogRequest>, res: Response<ICreateDialogResponse>, next: NextFunction) => {
        try {
            const dialogReqDto = new CreateDialogRequestDto(req.body);
            const doc = await this.service.create(dialogReqDto);
            if(!doc){
                throw ErrorException.BadRequestError("Invalid request data");
            };
            const dialogResDto = new CreateDialogResponseDto(doc);
            return res.status(201).json({ ...dialogResDto })
        } catch (error) {
            next(error)
        }
    }
}