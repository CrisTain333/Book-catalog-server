import { Model, Types } from 'mongoose';
import { IUser } from '../auth/interface';

export type IBook = {
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    reviews: string[];
    addedBy?: Types.ObjectId | IUser;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
