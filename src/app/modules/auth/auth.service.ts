import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";
import AppError from "../../errors/AppError";

const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistByEmail(payload.email);

    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, "User not found");
    }

    if (user.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
    }

    // password match check
    if (!(await User.isPasswordMatched(payload.password, user.password))) {
        throw new AppError(httpStatus.FORBIDDEN, "Passwords do not match");
    }

    const jwtPayload = {
        email: user.email,
        role: user.role
    }

    const token = createToken(jwtPayload, config.jwt_secret as string, config.jwt_expires_in as string);

    const { password, isDeleted, ...userWithoutPassword } = user;

    return {
        token,
        user: userWithoutPassword
    }
};

export const AuthServices = {
    loginUser
}