import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Slot } from "../slot/slot.model";
import mongoose from "mongoose";
import { User } from "../user/user.model";

const createBookingIntoDB = async (payload: TBooking) => {
    const service = await Service.findById(payload.service);

    if (!service) {
        throw new AppError(httpStatus.NOT_FOUND, "The service does not exist!");
    }

    const slot = await Slot.findById(payload.slot);

    if (!slot) {
        throw new AppError(httpStatus.NOT_FOUND, "The slot does not exist!");
    }

    if (slot.isBooked !== "available") {
        throw new AppError(httpStatus.BAD_REQUEST, "The slot is not available!");
    }

    if (slot.service.toString() !== payload.service.toString()) {
        throw new AppError(httpStatus.BAD_REQUEST, "Service and slot mismatch!")
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const newBooking = await Booking.create([payload], { session });

        const updatedSlot = await Slot.findByIdAndUpdate(
            payload.slot,
            { isBooked: "booked" },
            { new: true, session }
        )

        await session.commitTransaction();

        const updatedBooking = await Booking.findById(newBooking[0].id)
            .populate("service")
            .populate("customer")
            .populate("slot")

        return updatedBooking;

    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        await session.endSession();
    }


};

const getAllBookingsFromDB = async () => {
    const bookings = await Booking.find()
        .populate("customer")
        .populate("service")
        .populate("service")

    return bookings;
}

const getUserBookingsFromDB = async (userEmail: string, query: Record<string, unknown>) => {
    const user = await User.findOne({ email: userEmail });
    const currentDate = new Date();

    let userBookings;

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    if (!query?.time) {
        userBookings = await Booking.find({ customer: user._id })
            .populate("service")
            .populate("slot");
    }

    if (query.time === 'past') {
        userBookings = await Booking.aggregate([
            {
                $match: { customer: user._id } // Match user bookings
            },
            {
                $lookup: {
                    from: 'slots',               // The Slot collection
                    localField: 'slot',           // Booking's slot field
                    foreignField: '_id',          // Slot's _id field
                    as: 'slot'                    // Output field
                }
            },
            { $unwind: '$slot' },             // Deconstruct slot array
            {
                $addFields: {                   // Combine date and startTime into one Date object
                    slotDateTime: {
                        $dateFromString: {
                            dateString: {
                                $concat: [
                                    { $dateToString: { format: "%Y-%m-%d", date: "$slot.date" } }, // Format slot.date
                                    "T", "$slot.startTime" // Append startTime
                                ]
                            }
                        }
                    }
                }
            },
            {
                $match: { slotDateTime: { $lt: currentDate } }  // Filter past bookings
            },
            {
                $sort: { sortDateTime: -1 }
            }
        ]);
    }

    if (query?.time === "upcoming") {
        userBookings = await Booking.aggregate([
            {
                $match: { customer: user._id } // Match user bookings
            },
            {
                $lookup: {
                    from: 'slots',               // The Slot collection
                    localField: 'slot',           // Booking's slot field
                    foreignField: '_id',          // Slot's _id field
                    as: 'slot'                    // Output field
                }
            },
            { $unwind: '$slot' },             // Deconstruct slot array
            {
                $addFields: {                   // Combine date and startTime into one Date object
                    slotDateTime: {
                        $dateFromString: {
                            dateString: {
                                $concat: [
                                    { $dateToString: { format: "%Y-%m-%d", date: "$slot.date" } }, // Format slot.date
                                    "T", "$slot.startTime" // Append startTime
                                ]
                            }
                        }
                    }
                }
            },
            {
                $match: { slotDateTime: { $gte: currentDate } }  // Filter upcoming bookings
            },
            {
                $sort: { sortDateTime: 1 }
            }
        ]);
    }

    return userBookings;
}

export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getUserBookingsFromDB
}