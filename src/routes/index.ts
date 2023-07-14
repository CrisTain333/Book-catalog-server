import express from 'express';
import { authRoute } from '../api/auth/routes';
import { BooksRoutes } from '../api/book/routes';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/books', BooksRoutes);
export default router;
