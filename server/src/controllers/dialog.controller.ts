import { NextFunction, Response, Request } from "express";
import { CreateDialogRequestDto, DialogsReasponseDto, MessageResponseDto } from "../dtos";
import {
    IRequest,
    ICreateDialogRequest,
    IDialogResponse,
    IGetAllDialogResponse,
    IMessageResponse,
    IGetAllMessagesRequest,
} from "../models";
import { DialogService } from "../services/dialog.service";
import { ErrorException } from "../shared";


export class DialogController {

    private service: DialogService;

    constructor() {
        this.service = new DialogService();
    }

    create = async (req: IRequest<ICreateDialogRequest>, res: Response<IDialogResponse>, next: NextFunction) => {
        const userId = req.user.id;
        try {
            const dialogReqDto = new CreateDialogRequestDto(req.body);
            const doc = await this.service.create(dialogReqDto);
            if (!doc) {
                throw ErrorException.BadRequestError("Invalid request data");
            };
            const dialogResDto = new DialogsReasponseDto(doc, userId);
            return res.status(201).json({ ...dialogResDto });
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
                    messages: dialogDto.messages.length ? [dialogDto.messages.pop()] : [],
                };
            });
            return res.status(200).json({ dialogs: dilogsDto });
        } catch (error) {
            console.log(error);
            
            next(error);
        };
    }

    getOne = async (req: Request, res: Response<Array<IMessageResponse>>, next: NextFunction) => {
        const request = req as unknown as IGetAllMessagesRequest;
        try {
            const { id, offset, limit } = request.query;           
            if(!id || !offset || !limit) {
                throw ErrorException.BadRequestError("Wrong query parameters")
            };
            const messages = await this.service.getAllMessages(id, offset, limit);
            if (!Array.isArray(messages)) {
                throw ErrorException.ServerError();
            };
            const messagesDto = messages.map(message => new MessageResponseDto(message));
            return res.status(200).json(messagesDto);
        } catch (error) {
           next(error) 
        }
    }
}