"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidations = void 0;
var zod_1 = require("zod");
var createReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" }),
        rating: zod_1.z.number().min(1, { message: "Rating must be at least 1" }).max(5, { message: "Rating must be at most 5" }),
        comment: zod_1.z.string().min(1, { message: "Comment cannot be empty" }).max(500, { message: "Comment cannot exceed 500 characters" })
    })
});
exports.ReviewValidations = {
    createReviewValidationSchema: createReviewValidationSchema
};
