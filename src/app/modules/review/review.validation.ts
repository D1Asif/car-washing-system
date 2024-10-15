import { z } from "zod";

const createReviewValidationSchema = z.object({
    body: z.object({
        user: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" }),
        rating: z.number().min(1, { message: "Rating must be at least 1" }).max(5, { message: "Rating must be at most 5" }),
        comment: z.string().min(1, { message: "Comment cannot be empty" }).max(500, { message: "Comment cannot exceed 500 characters" })

    })
});

export const ReviewValidations = {
    createReviewValidationSchema
}