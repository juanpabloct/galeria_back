import * as bcrypt from "bcryptjs";

export async function hash(password: string) {

    return bcrypt.hash(password, 10);
}

export async function isEqualHash(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}
