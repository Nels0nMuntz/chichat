import { NextFunction, Response, Request } from "express";
import { DialogsReasponseDto } from "../dtos/dialogDtos/dialogsResponse.dto";
import { CreateDialogRequestDto, CreateDialogResponseDto } from "../dtos";
import {
    ICreateDialogRequest,
    ICreateDialogResponse,
    IGetAllDialogResponse,
} from "../models";
import { DialogService } from "../services/dialog.service";
import { ErrorException, IRequest } from "../shared";


export class DialogController {

    private service: DialogService;

    constructor() {
        this.service = new DialogService();
    }

    create = async (req: IRequest<ICreateDialogRequest>, res: Response<ICreateDialogResponse>, next: NextFunction) => {
        try {
            const dialogReqDto = new CreateDialogRequestDto(req.body);
            const doc = await this.service.create(dialogReqDto);
            if (!doc) {
                throw ErrorException.BadRequestError("Invalid request data");
            };
            const dialogResDto = new CreateDialogResponseDto(doc);
            return res.status(201).json({ ...dialogResDto })
        } catch (error) {
            next(error)
        }
    }

    getAll = async (req: Request, res: Response<IGetAllDialogResponse>, next: NextFunction) => {
        try {
            const userId = req.user.id;
            if (!userId) {
                throw ErrorException.BadRequestError("Invalid request data. There is no user ID");
            };
            const dialogs = await this.service.getAllDialogs(userId);
            if (!Array.isArray(dialogs)) {
                throw ErrorException.ServerError();
            };
            const dilogsDto = dialogs.map(dialog => {
                const dialogDto = new DialogsReasponseDto(dialog, req.user.id);
                return {
                    ...dialogDto,
                    messages: dialogDto.messages.length ? [dialogDto.messages[0]] : [],
                }
            });
            return res.status(200).json({ dialogs: dilogsDto });
        } catch (error) {
            next(error);
        };
    }
}