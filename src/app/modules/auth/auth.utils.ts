import jwt from "jsonwebtoken";

export const createToken = (jwtPayload: {email: string}, jwtSecret: string, expiresIn: string) => {
    const token = jwt.sign(jwtPayload, jwtSecret, { expiresIn });
    return token;
}