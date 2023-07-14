import express from 'express';
import { BooksController } from './controller';
import validateRequest from '../../middleware/validateRequest';
import { bookValidation } from './validate';
const router = express.Router();

router.get('/', BooksController.getAllBooks);
router.post(
    '/create-book',
    validateRequest(bookValidation.bookZodSchema),
    BooksController.createBook
);

export const BooksRoutes = router;
