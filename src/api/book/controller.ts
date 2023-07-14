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

export const BooksController = {
    getAllBooks,
    createBook,
    deleteBook
};
