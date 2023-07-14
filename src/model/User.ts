import { Schema, model } from 'mongoose';
import { IUser, UserModel } from '../api/auth/interface';
import bcrypt from 'bcrypt';
import config from '../config';
const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.salt_round)
    );
    next();
});

export const User = model<IUser, UserModel>('User', userSchema);
