import { RequestHandler } from 'express';
import { BookService } from './service';
import sendResponse from '../../shared/sendResponse';
import httpCode from 'http-status-codes';

const getAllBooks: RequestHandler = async (req, res, next) => {
    try {
        const result = await BookService.getAllBooksFromDb();
        sendResponse(res, {
            statusCode: httpCode.OK,
            success: true,
            data: result,
            message: 'Books Retrieved Successfully'
        });
    } catch (error) {
        next(error);
    }
};
const getSingleBook: RequestHandler = async (req, res, next) => {
    try {
        const bookID = req.params.id;
        const result = await BookService.getSingleBookFromDb(bookID);
        sendResponse(res, {
            statusCode: httpCode.OK,
            success: true,
            data: result,
            message: 'Book Retrieved Successfully'
        });
    } catch (error) {
        next(error);
    }
};

const createBook: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;
        await BookService.addBookToDb(payload);
        sendResponse(res, {
            statusCode: httpCode.OK,
            success: true,
            message: 'Book created successfully'
        });
    } catch (error) {
        next(error);
    }
};
const deleteBook: RequestHandler = async (req, res, next) => {
    try {
        const bookID = req.params.id;
        await BookService.deleteBookFromDb(bookID);
        sendResponse(res, {
            statusCode: httpCode.OK,
            success: true,
            message: 'Book deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
const addBookReviews: RequestHandler = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const review = req.body.review;
        await BookService.addReviews({ bookId, review });
        sendResponse(res, {
            statusCode: httpCode.OK,
            success: true,
            message: 'Review Added successfully'
        });
    } catch (error) {
        next(error);
    }
};
const updateBook: RequestHandler = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const payload = req.body;
        const result = await BookService.updateBook(payload, bookId);
        sendResponse(res, {
            statusCode: httpCode.OK,
            success: true,
            message: 'Book Updated successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const BooksController = {
    getAllBooks,
    createBook,
    deleteBook,
    getSingleBook,
    addBookReviews,
    updateBook
};
