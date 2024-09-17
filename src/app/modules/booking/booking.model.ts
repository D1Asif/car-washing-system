import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";
import { VEHICLE_TYPE } from "./booking.constant";

const BookingSchema = new Schema<TBooking>({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',        // Reference to the User model
        required: true,
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',     // Reference to the Service model
        required: true,
    },
    slot: {
        type: Schema.Types.ObjectId,
        ref: 'Slot',        // Reference to the Slot model
        required: true,
    },
    vehicleType: {
        type: String,
        enum: Object.keys(VEHICLE_TYPE),
        required: true,
    },
    vehicleBrand: {
        type: String,
        required: true,
    },
    vehicleModel: {
        type: String,
        required: true,
    },
    manufacturingYear: {
        type: Number,
        required: true,
    },
    registrationPlate: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Booking = model<TBooking>('Booking', BookingSchema);