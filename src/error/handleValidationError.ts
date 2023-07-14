import mongoose from 'mongoose';
import { IErrorMessage } from '../types/error';

const handleValidationError = (
    err: mongoose.Error.ValidationError
) => {
    const errors: IErrorMessage[] = Object.values(err.errors).map(
        (
            element:
                | mongoose.Error.ValidatorError
                | mongoose.Error.CastError
        ) => {
            return {
                path: element?.path,
                message: element?.message
            };
        }
    );

    return {
        statusCode: 400,
        message: 'Validation Error',
        errorMessages: errors
    };
};

export default handleValidationError;
