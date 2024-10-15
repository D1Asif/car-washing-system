import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";

const createBooking = catchAsync(async (req, res) => {
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const { serviceId, slotId, ...payload } = req.body;
    
    payload.slot = slotId;
    payload.service = serviceId;
    payload.customer = user.id;

    const result = await BookingServices.createBookingIntoDB(payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking successful",
        data: result
    })
});

const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All bookings retrieved successfully",
        data: result
    })
});

const getUserBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getUserBookingsFromDB(req.user.email, req.query);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User bookings retrieved successfully",
        data: result
    });
})

export const BookingControllers = {
    createBooking,
    getAllBookings,
    getUserBookings
}