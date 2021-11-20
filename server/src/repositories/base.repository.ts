import { Document, Model, FilterQuery, Query, QueryOptions, UpdateQuery } from "mongoose";
import { IReadable, IWritable } from "../models";

import { ErrorException } from "../shared";


export class BaseRepository<T extends Document> implements IReadable<T>, IWritable<T> {

    protected model: Model<T>;

    constructor(model: Model<T>){
        this.model = model;
    }

    exists = async (filter: FilterQuery<T>): Promise<boolean> => {
        try {
            return await this.model.exists(filter);
        } catch (error) {
            throw ErrorException.ServerError("Can not find document in DB");
        }
    }

    findById = async (id: string): Promise<T> => {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw ErrorException.ServerError("Can not find document in DB");
        }
    }

    findOne = async (filter: FilterQuery<T>, projection?: Object, options?: QueryOptions): Promise<T> => {
        try {
            console.log(filter);
            console.log(await this.model.findOne(filter, projection || null, options || null));
            
            return await this.model.findOne(filter, projection || null, options || null);
        } catch (error) {
            throw ErrorException.ServerError("Can not find document in DB");
        }
    }

    find = async (filter: FilterQuery<T>, projection?: Object, options?: QueryOptions): Promise<Query<T[], T>> => {
        try {
            return await this.model.find(filter, projection || null, options || null);
        } catch (error) {
            console.log({error});
            
            throw ErrorException.ServerError("Can not find document in DB");
        }
    }

    createOne = async (doc?: T | Object): Promise<T> => {
        try {
            return await this.model.create(doc || {});
        } catch (error) {
            throw ErrorException.ServerError("Can not create document in DB");
        }
    }

    updateOne = async (id: string, doc: UpdateQuery<T>): Promise<T> => {
        try {
            return await this.model.findByIdAndUpdate(id, doc, { new: true });
        } catch (error) {
            throw ErrorException.ServerError("Can not update document in DB");
        }
    }
    
    deleteOne = async (id: string): Promise<void> => {
        try {
            this.model.deleteOne({ _id: id } as FilterQuery<T>);
        } catch (error) {
            throw ErrorException.ServerError("Can not delete document in DB");
        }
    }
}