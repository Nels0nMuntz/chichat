import { Request, Response, NextFunction } from "express";
import { ErrorException } from "../shared";
import { IUserResponse } from "../models";
import { UserService } from "../services";
import { UserResponseDto } from "../dtos";


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

}