import express from 'express';
import { AuthController } from './controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidate } from './validate';
const router = express.Router();

router.post(
    '/sign-up',
    validateRequest(userValidate.userZodSchema),
    AuthController.registerUser
);

router.post(
    '/login',
    validateRequest(userValidate.userLoginZodSchema),
    AuthController.signUpUser
);

export const authRoute = router;
