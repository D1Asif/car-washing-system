import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./slot.service";
import AppError from "../../errors/AppError";

const createSlots = catchAsync(async (req, res) => {
    const result = await SlotServices.createSlotsIntoDB(req.body);

    if (!result.length) {
        throw new AppError(httpStatus.BAD_REQUEST, "Slots could not be created");
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Slots created successfully",
        data: result
    })
});

const getAvailableSlots = catchAsync(async (req, res) => {
    const result = await SlotServices.getAvailableSlotsFromDB(req.query);

    if (!result.length) {
        throw new AppError(httpStatus.NOT_FOUND, "No Available slots found!")
    }
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Available slots retrieved successfully",
        data: result
    })
});

export const SlotControllers = {
    createSlots,
    getAvailableSlots
}