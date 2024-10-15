import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
    const payload = req.body;

    const result = await UserServices.createUserIntoDB(payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: result
    })
});

const updateAccountInfo = catchAsync(async (req, res) => {
    const result = await UserServices.updateAccountInfo(req.user.email, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Account info updated successfully",
        data: result
    })
})

const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUsersFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result
    })
})

export const UserControllers = {
    createUser,
    updateAccountInfo,
    getAllUsers
}