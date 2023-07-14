import express from 'express';
import { authRoute } from '../api/auth/routes';
const router = express.Router();

router.use('/auth', authRoute);
export default router;
