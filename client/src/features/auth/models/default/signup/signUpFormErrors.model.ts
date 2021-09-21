import { FormErrors } from 'shared'
import { ISignUpFormValues } from './signUpFormValues.model'

export type SignUpFormErrors = Partial<FormErrors<ISignUpFormValues>>;