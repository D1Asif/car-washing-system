"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidations = void 0;
var zod_1 = require("zod");
var createServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        description: zod_1.z.string({ required_error: "Description is required" }),
        price: zod_1.z.number().min(0, "Price must be a positive number"),
        duration: zod_1.z.number().min(0, "Duration must be a positive number"),
        tags: zod_1.z.array(zod_1.z.string()),
        isDeleted: zod_1.z.boolean().default(false)
    })
});
var updateServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }).optional(),
        description: zod_1.z.string({ required_error: "Description is required" }).optional(),
        price: zod_1.z.number().min(0, "Price must be a positive number").optional(),
        duration: zod_1.z.number().min(0, "Duration must be a positive number").optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        isDeleted: zod_1.z.boolean().optional()
    })
});
exports.ServiceValidations = {
    createServiceValidationSchema: createServiceValidationSchema,
    updateServiceValidationSchema: updateServiceValidationSchema
};
