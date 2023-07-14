import { Model, Types } from 'mongoose';
import { IUser } from '../auth/interface';

export type IBook = {
    title: string;
    author: string;
    genre:
        | 'Fiction'
        | 'Fantasy'
        | 'Mystery'
        | 'Poetry'
        | 'Young Adult'
        | 'Non-Fiction'
        | 'Science Fiction'
        | 'Romance'
        | 'Thriller'
        | 'Historical Fiction'
        | 'Biography'
        | 'Self-Help'
        | 'Humor'
        | 'Drama'
        | 'Horror'
        | 'Adventure'
        | 'Action'
        | 'Classic'
        | 'Other';
    publicationDate: string;
    reviews: string[];
    addedBy?: Types.ObjectId | IUser;
};

export type IReviewPayload = {
    bookId: string;
    review: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
