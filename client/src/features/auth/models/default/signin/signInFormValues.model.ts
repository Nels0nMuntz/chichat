import { FormValues } from "shared";

export interface ISignInFormValues extends FormValues {
    email: string
    password: string
};