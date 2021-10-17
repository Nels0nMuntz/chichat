import { Request as ExpressRequest } from 'express';


export interface IRequest<T = {}, K = qs.ParsedQs> extends ExpressRequest<any, any, T, K> {};