import { FormErrors } from "shared";
import { ISignInFormValues } from "./signInFormValues.model";

export type SignInFormErrors = Partial<FormErrors<ISignInFormValues>>;