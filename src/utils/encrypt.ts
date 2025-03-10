
import bcrypt from 'bcryptjs';

export const hash = async (password) => {
    const genSalts = await bcrypt.genSalt();

    return await bcrypt.hash(password, genSalts)
};
export const isEqualHash = async (password: string, hash: string) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch
}