import { Request as ExpressRequest } from 'express';
import { IDecodedToken } from '../../src/shared';


declare global {
    namespace Express {
        interface Request {
            user?: IDecodedToken
        }
    }
}