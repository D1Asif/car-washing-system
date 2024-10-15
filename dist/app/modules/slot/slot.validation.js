"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotValidations = void 0;
var zod_1 = require("zod");
// Define a regex pattern for MongoDB ObjectId
var objectIdPattern = /^[0-9a-fA-F]{24}$/;
// Define a regex pattern for time in HH:MM format
var timePattern = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
var createSlotsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        service: zod_1.z.string().regex(objectIdPattern, { message: "Invalid ObjectId format" }),
        date: zod_1.z.string().date(),
        startTime: zod_1.z.string().regex(timePattern, { message: "Invalid time format, must be HH:MM" }),
        endTime: zod_1.z.string().regex(timePattern, { message: "Invalid time format, must be HH:MM" })
    })
});
var updateSlotStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        isBooked: zod_1.z.enum(['available', 'canceled'])
    })
});
exports.SlotValidations = {
    createSlotsValidationSchema: createSlotsValidationSchema,
    updateSlotStatusSchema: updateSlotStatusSchema
};
