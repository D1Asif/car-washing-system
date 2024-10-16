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

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Available slots retrieved successfully",
        data: result
    })
});

const getAllSlots = catchAsync(async (req, res) => {
    const result = await SlotServices.getAllSlotsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Slots retrieved successfully",
        data: result
    })
})

const getSlotByID = catchAsync(async (req, res) => {
    const result = await SlotServices.getSlotByIdFromDB(req.params.slotId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Slot retrieved successfully",
        data: result
    })
})

const updateSlotStatus = catchAsync(async (req, res) => {
    const result = await SlotServices.updateSlotStatusIntoDB(req.params?.slotId, req.body.isBooked);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Slot status updated successfully",
        data: result
    })
})

export const SlotControllers = {
    createSlots,
    getAvailableSlots,
    getAllSlots,
    getSlotByID,
    updateSlotStatus
}