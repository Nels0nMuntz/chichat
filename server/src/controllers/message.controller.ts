import { NextFunction, Response, Request } from "express";
import { CreateMessageRequestDto, MessageResponseDto, UpdateMessageRequestDto } from "../dtos";
import { ICreateMessageRequest, IMessageResponse, IUpdateMessageRequest, IRequest, ISearchQueryString } from "../models";
import { MessageService } from "../services/message.service";
import { ErrorException } from "../shared";


export class MessageController {

    private service: MessageService;

    constructor(){
        this.service = new MessageService();
    }

    create = async (req: IRequest<ICreateMessageRequest>, res: Response<IMessageResponse>, next: NextFunction) => {
        try {
           const messageReqDto = new CreateMessageRequestDto(req.body);
           const doc = await this.service.create(messageReqDto);
           if(!doc){
               throw ErrorException.BadRequestError("Invalid message data");
           }
           const messageResDto = new MessageResponseDto(doc);
           return res.status(201).json({ ...messageResDto });
        } catch (error) {
            next(error);
        }
    }

    update = async (req: IRequest<IUpdateMessageRequest>, res: Response<IMessageResponse>, next: NextFunction) => {
        try {
            const messageReqDto = new UpdateMessageRequestDto(req.body);
            const doc = await this.service.update(messageReqDto);
            if(!doc){
                throw ErrorException.BadRequestError("Invalid message data");
            };
            const messageResData = new MessageResponseDto(doc);
            res.status(200).json({ ...messageResData });
        } catch (error) {
            next(error);
        }
    }

    search = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const request = req as unknown as IRequest<{}, ISearchQueryString>;
            const userId = req.user.id;
            const { query } = request.query;
            
        } catch (error) {
            
        }
    }

}