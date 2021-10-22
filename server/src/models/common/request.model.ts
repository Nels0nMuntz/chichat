import { Request } from 'express';

export interface IRequest<T = {}, K = qs.ParsedQs> extends Request<any, any, T, K> {};