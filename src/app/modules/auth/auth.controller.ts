import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);

    const {token, user} = result;

    res.status(httpStatus.OK).json({
        success: true,
        message: "User logged in successfully",
        token,
        data: user
    })
});

export const AuthControllers = {
    loginUser
}