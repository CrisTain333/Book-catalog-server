import bcrypt from 'bcrypt';
import config from '../config';

const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(
        password,
        Number(config.salt_round)
    );

    return hashedPassword;
};

export default hashPassword;
