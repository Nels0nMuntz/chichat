import { FilterQuery, Query, QueryOptions } from "mongoose";

export interface IReadable<T>{
    exists: (filter: FilterQuery<T>) => Promise<boolean>
    findById: (id: string) => Promise<T>
    findOne: (filter: FilterQuery<T>, projection?: Object, options?: QueryOptions) => Promise<T>
    find: (filter: FilterQuery<T>, projection?: Object, options?: QueryOptions) => Promise<Query<T[], T>>
};