import * as Yup from 'yup';
import { regExpPatterns as patterns } from '../constants/regExpPatterns';
import { validationMessages as msg } from '../constants/validationMessages';

export const editProfilevalidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .matches(patterns.cyrillic, msg.firstName.error)
        .required(msg.empty),
    lastName: Yup.string().matches(patterns.cyrillic, msg.lastName.error),
});
