/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../error/ApiError';
import { User } from '../../model/User';
import { ILoginUser, IUser } from './interface';
import httpCode from 'http-status-codes';
import bcrypt from 'bcrypt';
import { jwtHelper } from '../../helper/jwtHelper';
import { Secret } from 'jsonwebtoken';
import config from '../../config';

const createUser = async (user: IUser): Promise<IUser | null> => {
    const { name, email, password } = user;

    //Check the email exist in database or not ;
    const isExits = await User.findOne({ email: email });

    if (isExits) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Email already exists'
        );
    }
    // now create the user;
    const newUser = User.create({
        name,
        email,
        password
    });

    return newUser;
};

const login = async (payload: ILoginUser) => {
    const { email: userEmail, password } = payload;
    const isUserExist = await User.findOne({ email: userEmail });

    // check the email exist
    if (!isUserExist) {
        throw new ApiError(httpCode.NOT_FOUND, 'User does not exist');
    }

    // check the password
    const isPasswordMatched = await bcrypt.compare(
        password,
        isUserExist?.password
    );

    // if not matched throw error;
    if (!isPasswordMatched) {
        throw new ApiError(
            httpCode.UNAUTHORIZED,
            'Invalid credentials'
        );
    }
    const { name, email } = isUserExist;

    // if matched created
    const accessToken = jwtHelper.createToken(
        { name, email },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken
    };
};

export const getUser = async (req: any) => {
    if (!req.user) {
        throw new ApiError(httpCode.UNAUTHORIZED, 'User not found');
    }
    const { email } = req.user;

    // console.log(req.user);
    const response = await User.findOne({ email: email });
    const { name, email: userEmail } = response!;
    const data = {
        name,
        email: userEmail
    };
    return data;
};

export const AuthService = {
    createUser,
    login,
    getUser
};
