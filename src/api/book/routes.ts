import express from 'express';
import { BooksController } from './controller';
const router = express.Router();

router.get('/', BooksController.getAllBooks);

export const BooksRoutes = router;
