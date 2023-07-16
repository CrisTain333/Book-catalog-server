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
exports.BookService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const Book_1 = require("../../model/Book");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getAllBooksFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Book_1.Book.find({}).sort({ createdAt: -1 });
    return result;
});
const getSingleBookFromDb = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Book_1.Book.findById(bookId);
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.default.NOT_FOUND, 'Book Not Found');
    }
    return result;
});
const addBookToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Book_1.Book.create(payload);
    return result;
});
const deleteBookFromDb = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExits = yield Book_1.Book.findById(bookId);
    if (!isExits) {
        throw new ApiError_1.default(http_status_codes_1.default.NOT_FOUND, 'Book Not Found');
    }
    const result = yield Book_1.Book.deleteOne({ _id: bookId });
    return result;
});
const addReviews = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, review } = payload;
    if (!mongoose_1.default.Types.ObjectId.isValid(bookId)) {
        throw new ApiError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Invalid Book Id');
    }
    try {
        const book = yield Book_1.Book.findOne({ _id: bookId });
        if (!book) {
            throw new ApiError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Invalid Book Id');
        }
        const result = yield Book_1.Book.updateOne({ _id: bookId }, {
            $push: { reviews: review }
        }, {
            new: true
        });
        return result;
    }
    catch (error) {
        // Handle any other errors that may occur during the process
        throw new ApiError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, 'An error occurred while adding the review');
    }
});
const updateBook = (payload, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bookId) {
        throw new ApiError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Book id is required');
    }
    const isExits = Book_1.Book.findById(bookId);
    if (!isExits) {
        throw new ApiError_1.default(http_status_codes_1.default.NOT_FOUND, 'Book Not found');
    }
    const result = Book_1.Book.findOneAndUpdate({ _id: bookId }, payload, {
        new: true
    });
    return result;
});
exports.BookService = {
    getAllBooksFromDb,
    addBookToDb,
    deleteBookFromDb,
    getSingleBookFromDb,
    addReviews,
    updateBook
};
