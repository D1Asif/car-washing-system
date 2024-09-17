"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
var zod_1 = require("zod");
var booking_constant_1 = require("./booking.constant");
// Define a regex pattern for MongoDB ObjectId
var objectIdPattern = /^[0-9a-fA-F]{24}$/;
var createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string().regex(objectIdPattern, { message: "Invalid ObjectId format" }),
        slotId: zod_1.z.string().regex(objectIdPattern, { message: "Invalid ObjectId format" }),
        vehicleType: zod_1.z.enum(Object.keys(booking_constant_1.VEHICLE_TYPE)),
        vehicleBrand: zod_1.z.string().min(1, { message: 'Vehicle brand is required' }),
        vehicleModel: zod_1.z.string().min(1, { message: 'Vehicle model is required' }),
        manufacturingYear: zod_1.z
            .number()
            .min(1886, { message: 'Manufacturing year cannot be before 1886' }) // First car was invented in 1886
            .max(new Date().getFullYear(), { message: 'Manufacturing year cannot be in the future' }),
        registrationPlate: zod_1.z.string().min(1, { message: 'Registration plate is required' }).max(20),
    })
});
exports.BookingValidations = {
    createBookingValidationSchema: createBookingValidationSchema
};
