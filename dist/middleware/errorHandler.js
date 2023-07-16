"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { IErrorResponse, IErrorMessage } from '../interface/error';
const handleValidationError_1 = __importDefault(require("../error/handleValidationError"));
const config_1 = __importDefault(require("../config"));
const zodErrorHandler_1 = __importDefault(require("../error/zodErrorHandler"));
const zod_1 = require("zod");
const ApiError_1 = __importDefault(require("../error/ApiError"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let errorMessages = [];
    // Handle different types of errors
    if (error.name === 'ValidationError') {
        // Get the simplified error;
        const validationError = (0, handleValidationError_1.default)(error);
        statusCode = validationError.statusCode;
        message = validationError.message;
        errorMessages = validationError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodErrorHandler_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message
                }
            ]
            : [];
    }
    else if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Cast Error';
        errorMessages.push({
            path: error.path,
            message: `Invalid Id`
        });
    }
    else if (error.code === 11000) {
        statusCode = 409;
        message = 'Duplicate Entry . . .';
        errorMessages.push({
            path: '',
            message: error.message
        });
    }
    // Error response
    const errorResponse = {
        success: false,
        message,
        errorMessages,
        stack: config_1.default.NODE_ENV !== 'production'
            ? error === null || error === void 0 ? void 0 : error.stack
            : undefined
    };
    // Send the error response
    res.status(statusCode).json(errorResponse);
};
exports.default = globalErrorHandler;
