import express from 'express';
import { AuthController } from './controller';
const router = express.Router();

router.post('/sign-up', AuthController.registerUser);

export const authRoute = router;
