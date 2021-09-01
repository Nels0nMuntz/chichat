import { FormData, FormValues, Status } from "shared";

export interface IAuthFormProps<T extends FormValues>{
    submittingStatus: Status
    formData: FormData<T>
};