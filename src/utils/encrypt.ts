
import bcrypt from 'bcryptjs';

export async function hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
export const isEqualHash = async (password: string, hash: string) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch
}