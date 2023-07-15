import { RequestHandler } from 'express';
import { ILoginUser, IUser } from './interface';
import { AuthService } from './service';
import sendResponse from '../../shared/sendResponse';
import httpCode from 'http-status-codes';

const registerUser: RequestHandler = async (req, res, next) => {
    try {
        const user: IUser = req.body;
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

const signUpUser: RequestHandler = async (req, res, next) => {
    try {
        const data: ILoginUser = req.body;
        const response = await AuthService.login(data);
        sendResponse(res, {
            success: true,
            statusCode: httpCode.OK,
            message: 'Login Success',
            data: {
                accessToken: response?.accessToken
            }
        });
    } catch (error) {
        next(error);
    }
};

const getUserProfile: RequestHandler = async (req, res, next) => {
    try {
        const response = await AuthService.getUser(req);
        sendResponse(res, {
            success: true,
            statusCode: httpCode.OK,
            message: 'User retrieved successfully',
            data: response
        });
    } catch (error) {
        next(error);
    }
};

export const AuthController = {
    registerUser,
    signUpUser,
    getUserProfile
};
