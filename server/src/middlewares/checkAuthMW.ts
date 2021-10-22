import { NextFunction, Request, Response } from "express";
import { ErrorException } from "../shared";
import { TokenService } from "../services";
import { IDecodedToken } from "../models";


const tokenService = new TokenService();

export const checkAuthMW = (req: Request, res: Response, next: NextFunction) => {    
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            throw ErrorException.UnauthorizedError();
        };
        const accessToken = authorizationHeader.split(" ")[1];
        if(!accessToken) {
            throw ErrorException.UnauthorizedError();
        };
        const payload = tokenService.validateAccessToken(accessToken);
        if(!payload) {
            throw ErrorException.UnauthorizedError();
        };

        req.user = payload as IDecodedToken;

        next();
    } catch (error) {
        next(ErrorException.UnauthorizedError());
    };
};