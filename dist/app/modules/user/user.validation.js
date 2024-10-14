"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
var zod_1 = require("zod");
var createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string()
            .min(8, "Password needs to be minimum 8 characters")
            .max(20, "Password cannot be larger than 20 characters"),
        phone: zod_1.z.string(),
        role: zod_1.z.enum(["user", "admin"]),
        address: zod_1.z.string()
    })
});
var updateAccountInfoValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional()
    })
});
exports.UserValidations = {
    createUserValidationSchema: createUserValidationSchema,
    updateAccountInfoValidation: updateAccountInfoValidation
};
