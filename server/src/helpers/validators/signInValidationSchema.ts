import { checkSchema } from "express-validator";

export const signInValidationSchema = checkSchema({
    email: {
        notEmpty: {
            errorMessage: "E-mail is required",
            bail: true,
        },
        normalizeEmail: {
            options: []
        },
        isEmail: {
            errorMessage: "Incorrect email format",
            bail: true,
        },
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required",
            bail: true,
        },
    },
})