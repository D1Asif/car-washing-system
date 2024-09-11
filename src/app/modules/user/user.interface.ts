import { Model } from "mongoose";

export interface TUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: "admin" | "user",
    address: string,
    isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
    isUserExistByEmail(email: string): Promise<TUser>,
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>
}