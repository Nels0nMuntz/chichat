"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpValidationSchema = void 0;
var express_validator_1 = require("express-validator");
var repositories_1 = require("../../repositories");
exports.signUpValidationSchema = (0, express_validator_1.checkSchema)({
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
        custom: {
            options: function (value) {
                return repositories_1.userRepository.findOneByEmail(value)
                    .then(function (user) { if (user)
                    return Promise.reject("Email already in use"); })
                    .catch(function (err) { throw err; });
            }
        }
    },
    firstName: {
        trim: true,
        notEmpty: {
            errorMessage: "First name is required",
            bail: true,
        },
        matches: {
            options: [/^([A-Z][a-z\-']{1,50})|([А-ЯЁIЇҐЄ][а-яёіїґє\-']{1,50})$/],
            errorMessage: "Incorrect first name format",
        }
    },
    lastName: {
        trim: true,
        optional: {
            options: { nullable: true },
        },
        notEmpty: {
            errorMessage: "Incorrect last name format",
            bail: true,
        },
        matches: {
            options: [/^([A-Z][a-z\-']{1,50})|([А-ЯЁIЇҐЄ][а-яёіїґє\-']{1,50})$/],
            errorMessage: "Incorrect last name format",
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required",
            bail: true,
        },
        custom: {
            options: function (value) {
                if (value.length < 8)
                    return Promise.reject("Password must be at least 8 characters");
                if (value.length > 20)
                    return Promise.reject("Password must be less or equal 20 characters");
                if (!/[0-9]/g.test(value))
                    return Promise.reject("Password must contain numbers");
                if (!/[a-zA-Z]/g.test(value))
                    return Promise.reject("Password must contain letters");
                if (!/[a-z]/g.test(value))
                    return Promise.reject("Password must contain lowercase letters");
                if (!/[A-Z]/g.test(value))
                    return Promise.reject("Password must contain uppercase letters");
                return Promise.resolve();
            }
        }
    },
    passwordRepeat: {
        notEmpty: {
            errorMessage: "Password confirmation is required",
            bail: true,
        },
        custom: {
            options: function (value, _a) {
                var req = _a.req;
                return value === req.body.password;
            },
            errorMessage: "Password and password confirmation do not match",
        },
    },
    phoneNumber: {
        trim: true,
        escape: true,
        notEmpty: {
            errorMessage: "Phone number is required",
            bail: true,
        },
        isMobilePhone: {
            options: ['uk-UA', 'ru-RU'],
            errorMessage: "Incorrect phone number format",
            bail: true,
        },
        custom: {
            options: function (value) {
                return repositories_1.userRepository.findOneByPhoneNumber(value)
                    .then(function (user) { if (user)
                    return Promise.reject("This phone number is already in use"); })
                    .catch(function (err) { throw err; });
            }
        }
    }
});
//# sourceMappingURL=signUpValidationSchema.js.map