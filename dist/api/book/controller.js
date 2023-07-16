"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const service_1 = require("./service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_1.BookService.getAllBooksFromDb();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            data: result,
            message: 'Books Retrieved Successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookID = req.params.id;
        const result = yield service_1.BookService.getSingleBookFromDb(bookID);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            data: result,
            message: 'Book Retrieved Successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        yield service_1.BookService.addBookToDb(payload);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: 'Book created successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookID = req.params.id;
        yield service_1.BookService.deleteBookFromDb(bookID);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: 'Book deleted successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
const addBookReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const review = req.body.review;
        yield service_1.BookService.addReviews({ bookId, review });
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: 'Review Added successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const payload = req.body;
        const result = yield service_1.BookService.updateBook(payload, bookId);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: 'Book Updated successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BooksController = {
    getAllBooks,
    createBook,
    deleteBook,
    getSingleBook,
    addBookReviews,
    updateBook
};
