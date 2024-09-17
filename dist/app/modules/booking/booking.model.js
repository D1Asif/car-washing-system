"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
var mongoose_1 = require("mongoose");
var booking_constant_1 = require("./booking.constant");
var BookingSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    slot: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true,
    },
    vehicleType: {
        type: String,
        enum: Object.keys(booking_constant_1.VEHICLE_TYPE),
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
exports.Booking = (0, mongoose_1.model)('Booking', BookingSchema);
