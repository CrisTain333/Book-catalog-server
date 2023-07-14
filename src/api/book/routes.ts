import express from 'express';
import { BooksController } from './controller';
import validateRequest from '../../middleware/validateRequest';
import { bookValidation } from './validate';
import auth from '../../middleware/auth';
// import auth from '../../middleware/auth';
const router = express.Router();

router.post(
    '/create-book',
    auth(),
    validateRequest(bookValidation.bookZodSchema),
    BooksController.createBook
);
router.delete('/:id', auth(), BooksController.deleteBook);

router.get('/:id', BooksController.getSingleBook);

router.patch(
    '/add-review/:id',
    auth(),
    validateRequest(bookValidation.reviewZodSchema),
    BooksController.addBookReviews
);

router.get('/', BooksController.getAllBooks);

export const BooksRoutes = router;
