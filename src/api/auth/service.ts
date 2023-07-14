import ApiError from '../../error/ApiError';
import { User } from '../../model/User';
import { IUser } from './interface';
import httpCode from 'http-status-codes';

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

    // return the newly created user ;
    return newUser;
};

export const AuthService = {
    createUser
};
