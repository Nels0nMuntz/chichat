import { Request, Response, NextFunction } from "express";
import { ErrorCode, ErrorException } from '../shared';

export const errorHandlerMW = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ErrorException){
        return res.status(err.status).json({ error: err });
    }else{
        return res.status(500).send({ code: ErrorCode.UNKNOWN_ERROR, status: 500, error: err });
    }
};