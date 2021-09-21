import { FormData, FormValues, Status } from "shared";

export interface IAuthFormProps<T extends FormValues>{
    submitStatus: Status
    formData: FormData<T>
    isValid: boolean
    handleSubmit: () => void
};