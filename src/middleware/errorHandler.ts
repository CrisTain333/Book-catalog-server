/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
// import { IErrorResponse, IErrorMessage } from '../interface/error';
import handleValidationError from '../error/handleValidationError';
import config from '../config';
import handleZodError from '../error/zodErrorHandler';
import { ZodError } from 'zod';
import ApiError from '../error/ApiError';
import { IErrorMessage, IErrorResponse } from '../types/error';

const globalErrorHandler: ErrorRequestHandler = (
    error,
    req,
    res,
    next
) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let errorMessages: IErrorMessage[] = [];

    // Handle different types of errors
    if (error.name === 'ValidationError') {
        // Get the simplified error;
        const validationError = handleValidationError(error);
        statusCode = validationError.statusCode;
        message = validationError.message;
        errorMessages = validationError.errorMessages;
    } else if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = error?.message
            ? [
                  {
                      path: '',
                      message: error?.message
                  }
              ]
            : [];
    } else if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Cast Error';
        errorMessages.push({
            path: error.path as string,
            message: `Invalid Id`
        });
    } else if (error.code === 11000) {
        statusCode = 409;
        message = 'Duplicate Entry . . .';
        errorMessages.push({
            path: '',
            message: error.message
        });
    }

    // Error response
    const errorResponse: IErrorResponse = {
        success: false,
        message,
        errorMessages,
        stack:
            config.NODE_ENV !== 'production'
                ? error?.stack
                : undefined
    };

    // Send the error response
    res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
