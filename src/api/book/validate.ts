import { z } from 'zod';
import { bookGenre } from './constant';

const bookZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Book Title Is Required'
        }),
        author: z.string({
            required_error: 'Author  Is Required'
        }),
        genre: z.enum([...bookGenre] as [string, ...string[]], {
            required_error: 'Book Genre is Required'
        }),
        publicationDate: z.string({
            required_error: 'Publication date Is Required'
        }),
        reviews: z.array(z.string()).optional(),
        addedBy: z.string({
            required_error: 'User id is Required'
        })
    })
});

const reviewZodSchema = z.object({
    body: z.object({
        review: z.object({
            message: z.string({
                required_error: 'Message is required'
            }),
            name: z.string({
                required_error: 'Name is required'
            })
        })
    })
});

const bookUpdateZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Book Title Is Required'
        }),
        author: z.string({
            required_error: 'Author  Is Required'
        }),
        genre: z.enum([...bookGenre] as [string, ...string[]], {
            required_error: 'Book Genre is Required'
        }),
        publicationDate: z.string({
            required_error: 'Publication date Is Required'
        }),
        reviews: z.array(z.string()).optional(),
        addedBy: z.string({
            required_error: 'User id is Required'
        })
    })
});

export const bookValidation = {
    bookZodSchema,
    reviewZodSchema,
    bookUpdateZodSchema
};
