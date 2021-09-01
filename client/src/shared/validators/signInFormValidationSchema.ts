import * as Yup from 'yup';
import { regExpPatterns as patterns } from '../constants/regExpPatterns';
import { validationMessages as msg } from '../constants/validationMessages';

export const signInFormValidationSchema = Yup.object().shape({
    email: Yup
        .string()
        .matches(patterns.email, msg.email.error)
        .required(msg.empty),
    password: Yup
        .string()
        .min(8, msg.password.error.minLenght)
        .max(20, msg.password.error.maxLenght)
        .matches(patterns.password, msg.password.error.wrongChar)
        .required(msg.empty),
});