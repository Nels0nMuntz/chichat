import { FormValues } from "shared";

export interface ISignUpFormValues extends FormValues {
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    password: string
    passwordRepeat: string
};