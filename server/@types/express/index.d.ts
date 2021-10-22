import { Request as ExpressRequest } from 'express';
import { IDecodedToken } from '../../src/models';


declare global {
    namespace Express {
        interface Request {
            user?: IDecodedToken
        }
    }
}