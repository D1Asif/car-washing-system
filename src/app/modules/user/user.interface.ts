import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: "admin" | "user",
    address: string,
    isDeleted: boolean
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
    isUserExistByEmail(email: string): Promise<TUser>,
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>
}