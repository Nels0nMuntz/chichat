import { Request, Response, NextFunction } from "express";
import { ErrorException } from "../shared";
import { IUserResponse, ISearchUsersResponse, IRequest, ISearchQueryString } from "../models";
import { UserService } from "../services";
import { UpdateUserDto, UserResponseDto } from "../dtos";


export class UserController {

    private service: UserService;

    constructor(){
        this.service = new UserService();
    }

    getOne = async (req: Request, res: Response<IUserResponse>, next: NextFunction) => {
        try {
            const userId = req.user.id;
            if (!userId) {
                throw ErrorException.BadRequestError("Invalid request data. There is no user ID");
            };
            const userDocument = await this.service.getUserData(userId);
            const userDto = new UserResponseDto(userDocument);
            return res.status(200).json({ ...userDto });
        } catch (error) {
            next(error);
        };
    }

    update = async (req: Request, res: Response<IUserResponse>, next: NextFunction) => {
        try {
            const userId = req.user.id;
            if (!userId) {
                throw ErrorException.BadRequestError("Invalid request data. There is no user ID");
            };
            const userDto = new UpdateUserDto(req.body, userId);
            await this.service.updateUserData(userDto);
            return res.status(200).end();
        } catch (error) {
            next(error);
        };
    }

    search = async (req: Request, res: Response<ISearchUsersResponse>, next: NextFunction) => {
        try {
            const request = req as unknown as IRequest<{}, ISearchQueryString>;
            const userId = req.user.id;
            const  { query, internal } = request.query;
            const users = await this.service.search(userId, query, internal);
            const usersDto = users.map(user => new UserResponseDto(user));
            return res.status(200).json(usersDto);
        } catch (error) {
            next(error);
        };
    }

}