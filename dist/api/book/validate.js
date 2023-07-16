"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidation = void 0;
const zod_1 = require("zod");
const constant_1 = require("./constant");
const bookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Book Title Is Required'
        }),
        author: zod_1.z.string({
            required_error: 'Author  Is Required'
        }),
        genre: zod_1.z.enum([...constant_1.bookGenre], {
            required_error: 'Book Genre is Required'
        }),
        publicationDate: zod_1.z.string({
            required_error: 'Publication date Is Required'
        }),
        reviews: zod_1.z.array(zod_1.z.string()).optional(),
        addedBy: zod_1.z.string({
            required_error: 'User id is Required'
        })
    })
});
const reviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({})
});
const bookUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Book Title Is Required'
        }),
        author: zod_1.z.string({
            required_error: 'Author  Is Required'
        }),
        genre: zod_1.z.enum([...constant_1.bookGenre], {
            required_error: 'Book Genre is Required'
        }),
        publicationDate: zod_1.z.string({
            required_error: 'Publication date Is Required'
        }),
        reviews: zod_1.z.array(zod_1.z.object({})).optional(),
        addedBy: zod_1.z.string({
            required_error: 'User id is Required'
        })
    })
});
exports.bookValidation = {
    bookZodSchema,
    reviewZodSchema,
    bookUpdateZodSchema
};
