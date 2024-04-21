"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidationSchema = void 0;
var express_validator_1 = require("express-validator");
exports.signInValidationSchema = (0, express_validator_1.checkSchema)({
    email: {
        trim: true,
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
});
//# sourceMappingURL=signInValidationSchema.js.map