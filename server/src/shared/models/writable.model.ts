import { UpdateResult } from "mongodb";
import { QueryOptions, UpdateQuery } from "mongoose";

export interface IWritable<T> {
    createOne: (doc?: T | Object) => Promise<T>
    updateOne: (id: string, doc: UpdateQuery<T>, options?: QueryOptions) => Promise<T>
    deleteOne: (id: string) => Promise<void>
}