/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import ApiError from '../error/ApiError';
// import { jwtHelpers } from '../helpers/jwtHelper';
import config from '../config';
import { Secret } from 'jsonwebtoken';
import { jwtHelper } from '../helper/jwtHelper';

const auth =
    () => async (req: any, res: Response, next: NextFunction) => {
        try {
            //get authorization token
            const token = req.headers.authorization;
            console.log(req.body);
            if (!token) {
                throw new ApiError(401, 'You are not authorized');
            }
            // verify token
            let verifiedUser = null;

            verifiedUser = jwtHelper.verifyToken(
                token,
                config.jwt.secret as Secret
            );
            req.user = verifiedUser;
            next();
        } catch (error) {
            next(error);
        }
    };

export default auth;
