import { z } from "zod";

const createServiceValidationSchema = z.object({
    body: z.object({
        name: z.string({required_error: "Name is required"}),
        description: z.string({required_error: "Description is required"}),
        price: z.number().min(0, "Price must be a positive number"),
        duration: z.number().min(0, "Duration must be a positive number"),
        isDeleted: z.boolean().default(false)
    })
});

const updateServiceValidationSchema = z.object({
    body: z.object({
        name: z.string({required_error: "Name is required"}).optional(),
        description: z.string({required_error: "Description is required"}).optional(),
        price: z.number().min(0, "Price must be a positive number").optional(),
        duration: z.number().min(0, "Duration must be a positive number").optional(),
        isDeleted: z.boolean().optional()
    })
});

export const ServiceValidations = {
    createServiceValidationSchema,
    updateServiceValidationSchema
}