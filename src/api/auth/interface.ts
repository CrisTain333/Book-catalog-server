import { Model } from 'mongoose';

export type IUser = {
    name: string;
    email: string;
    password: string;
};

export type ILoginUser = {
    email: string;
    password: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
