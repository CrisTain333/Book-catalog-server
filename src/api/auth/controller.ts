import { RequestHandler } from 'express';
import { IUser } from './interface';
import { AuthService } from './service';
import sendResponse from '../../shared/sendResponse';
import httpCode from 'http-status-codes';

const registerUser: RequestHandler = async (req, res, next) => {
    try {
        const user: IUser = req.body;
        console.log(user);
        const response = await AuthService.createUser(user);
        sendResponse(res, {
            success: true,
            statusCode: httpCode.OK,
            message: 'User Created Successfully',
            data: response
        });
    } catch (error) {
        next(error);
    }
};

export const AuthController = {
    registerUser
};
