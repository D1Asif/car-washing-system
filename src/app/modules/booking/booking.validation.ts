import { z } from "zod";
import { VEHICLE_TYPE } from "./booking.constant";

// Define a regex pattern for MongoDB ObjectId
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const createBookingValidationSchema = z.object({
    body: z.object({
        serviceId: z.string().regex(objectIdPattern, { message: "Invalid ObjectId format" }),
        slotId: z.string().regex(objectIdPattern, { message: "Invalid ObjectId format" }),
        vehicleType: z.enum(Object.keys(VEHICLE_TYPE) as [string, ...string[]]), // Validate vehicleType as one of the allowed enum values
        vehicleBrand: z.string().min(1, { message: 'Vehicle brand is required' }),
        vehicleModel: z.string().min(1, { message: 'Vehicle model is required' }),
        manufacturingYear: z
            .number()
            .min(1886, { message: 'Manufacturing year cannot be before 1886' }) // First car was invented in 1886
            .max(new Date().getFullYear(), { message: 'Manufacturing year cannot be in the future' }),
        registrationPlate: z.string().min(1, { message: 'Registration plate is required' }).max(20),
    })
})

export const BookingValidations = {
    createBookingValidationSchema
}