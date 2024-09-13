import { z } from "zod";

// Define a regex pattern for MongoDB ObjectId
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

// Define a regex pattern for time in HH:MM format
const timePattern = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

const createSlotsValidationSchema = z.object({
    body: z.object({
        service: z.string().regex(objectIdPattern, { message: "Invalid ObjectId format" }), // Validate MongoDB ObjectId
        date: z.string().date(),
        startTime: z.string().regex(timePattern, { message: "Invalid time format, must be HH:MM" }),
        endTime: z.string().regex(timePattern, { message: "Invalid time format, must be HH:MM" })
    })
})

export const SlotValidations = {
    createSlotsValidationSchema
}