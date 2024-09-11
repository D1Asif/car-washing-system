import { z } from "zod";

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
            .min(8, "Password needs to be minimum 8 characters")
            .max(20, "Password cannot be larger than 20 characters"),
        phone: z.string(),
        role: z.enum(["user", "admin"]),
        address: z.string()
    })
});

export const UserValidations = {
    createUserValidationSchema
}