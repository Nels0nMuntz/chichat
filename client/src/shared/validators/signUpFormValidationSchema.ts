import * as Yup from 'yup';
import { regExpPatterns as patterns } from '../constants/regExpPatterns';
import { validationMessages as msg } from '../constants/validationMessages';

export const signUpFormValidationSchema = Yup.object().shape({
    email: Yup
        .string()
        .matches(patterns.email, msg.email.error)
        .required(msg.empty),
    firstName: Yup
        .string()
        .matches(patterns.cyrillic, msg.firstName.error)
        .required(msg.empty),
    lastName: Yup
        .string()
        .matches(patterns.cyrillic, msg.lastName.error)
        .required(msg.empty),
    phoneNumber: Yup
        .string()
        .min(18, msg.phoneNumber.error)
        .required(msg.empty),
    password: Yup
        .string()
        .min(8, msg.password.error.minLenght)
        .max(20, msg.password.error.maxLenght)
        .matches(patterns.password, msg.password.error.wrongChar)
        .required(msg.empty),
    paswordRepeat: Yup
        .string()
        .oneOf([Yup.ref('password'), null], msg.password.notMatch)
        .required(msg.empty),
})