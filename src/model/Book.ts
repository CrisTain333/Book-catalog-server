import { Schema, model } from 'mongoose';
import { BookModel, IBook } from '../api/book/interface';
const bookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        publicationDate: {
            type: String,
            required: true
        },
        reviews: {
            type: [String], // Specify the array type with string items
            default: []
        },
        addedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

export const Book = model<IBook, BookModel>('Book', bookSchema);
