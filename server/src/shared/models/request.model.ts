import { Request as ExpressRequest, Response as ExpressResponse } from 'express';


export interface IRequest<T = {}> extends ExpressRequest<any, any, T> {};