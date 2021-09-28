import { Request as ExpressRequest, Response as ExpressResponse } from 'express';


export interface IRequest<T = {}, K = qs.ParsedQs> extends ExpressRequest<any, any, T, K> {};