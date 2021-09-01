import { FormikHandlers } from "formik";
import { FormValues } from "./formValues.model";

export type FormData<T extends FormValues> = {
    [P in keyof T]: {
        name: P
        label: string
        type: 'text' | 'password'
        value: string
        error: string | undefined
        touched: boolean | undefined
        onBlur: FormikHandlers['handleBlur'];
        onChange: FormikHandlers['handleChange'];
    }
};