import { FormValues } from "./formValues.model";

export type FormErrors<T extends FormValues> = {
    [P in keyof T]: string
};