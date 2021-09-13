import { checkSchema } from "express-validator"
import { UserRepository } from "../../repositories";


const userRepository = new UserRepository();

export const signUpValidationSchema = checkSchema({
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
            options: (value) => {
                return userRepository.getOneByEmail(value)
                    .then(user => { if (user) return Promise.reject("Email already in use") })
                    .catch(err => { throw err })
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
        notEmpty: {
            errorMessage: "Last name is required",
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
            options: (value: string) => {
                if (value.length < 8) return Promise.reject("Password must be at least 8 characters");
                if (value.length > 20) return Promise.reject("Password must be less or equal 20 characters");
                if (!/[0-9]/g.test(value)) return Promise.reject("Password must contain numbers");
                if (!/[a-zA-Z]/g.test(value)) return Promise.reject("Password must contain letters");
                if (!/[a-z]/g.test(value)) return Promise.reject("Password must contain lowercase letters");
                if (!/[A-Z]/g.test(value)) return Promise.reject("Password must contain uppercase letters");
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
            options: (value, { req }) => value === req.body.password,
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
            options: value => {
                return userRepository.getOneByPhoneNumber(value)
                    .then(user => { if (user) return Promise.reject("This phone number is already in use") })
                    .catch(err => { throw err })
            }
        }
    }
})