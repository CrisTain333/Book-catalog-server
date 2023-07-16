import mongoose from 'mongoose';
import ApiError from '../../error/ApiError';
import { Book } from '../../model/Book';
import { IBook, IReviewPayload } from './interface';
import httpCode from 'http-status-codes';

const getAllBooksFromDb = async (): Promise<IBook[] | null> => {
    const result = await Book.find({}).sort({ createdAt: -1 });
    return result;
};

const getSingleBookFromDb = async (
    bookId: string
): Promise<IBook | null> => {
    const result = await Book.findById(bookId);

    if (!result) {
        throw new ApiError(httpCode.NOT_FOUND, 'Book Not Found');
    }
    return result;
};

const addBookToDb = async (payload: IBook): Promise<IBook | null> => {
    const result = await Book.create(payload);
    return result;
};

const deleteBookFromDb = async (bookId: string) => {
    const isExits = await Book.findById(bookId);
    if (!isExits) {
        throw new ApiError(httpCode.NOT_FOUND, 'Book Not Found');
    }

    const result = await Book.deleteOne({ _id: bookId });
    return result;
};

const addReviews = async (payload: IReviewPayload) => {
    const { bookId, review } = payload;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Invalid Book Id');
    }

    try {
        const book = await Book.findOne({ _id: bookId });
        if (!book) {
            throw new ApiError(
                httpCode.BAD_REQUEST,
                'Invalid Book Id'
            );
        }

        const result = await Book.updateOne(
            { _id: bookId },
            {
                $push: { reviews: review }
            },
            {
                new: true
            }
        );

        return result;
    } catch (error) {
        // Handle any other errors that may occur during the process
        throw new ApiError(
            httpCode.INTERNAL_SERVER_ERROR,
            'An error occurred while adding the review'
        );
    }
};

const updateBook = async (
    payload: IBook,
    bookId: string
): Promise<IBook | null> => {
    if (!bookId) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Book id is required'
        );
    }

    const isExits = Book.findById(bookId);
    if (!isExits) {
        throw new ApiError(httpCode.NOT_FOUND, 'Book Not found');
    }

    const result = Book.findOneAndUpdate({ _id: bookId }, payload, {
        new: true
    });

    return result;
};

export const BookService = {
    getAllBooksFromDb,
    addBookToDb,
    deleteBookFromDb,
    getSingleBookFromDb,
    addReviews,
    updateBook
};
