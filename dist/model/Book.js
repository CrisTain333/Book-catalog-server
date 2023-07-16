"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const constant_1 = require("../api/book/constant");
const reviewSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const bookSchema = new mongoose_1.Schema({
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
        required: true,
        enum: constant_1.bookGenre
    },
    publicationDate: {
        type: String,
        required: true
    },
    reviews: {
        type: [reviewSchema],
        default: []
    },
    addedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
