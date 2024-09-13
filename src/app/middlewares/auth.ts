import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {
        const authHeader = req?.headers?.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route!")
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

        const { email } = decoded;

        // check if the user exists
        const user = await User.isUserExistByEmail(email);

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "Authentication failure: user not found");
        }

        if (user.isDeleted) {
            throw new AppError(httpStatus.FORBIDDEN, "Authentication failure: user is deleted");
        }

        if (requiredRoles.length && !requiredRoles.includes(user.role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route!")
        }

        req.user = decoded as JwtPayload;

        next();
    });
}

export default auth;
