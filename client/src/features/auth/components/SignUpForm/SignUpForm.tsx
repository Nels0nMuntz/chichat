import React from 'react';
import { Link } from 'react-router-dom';

import { IAuthFormProps, ISignUpFormValues } from '../../models';
import { SubmitButton, Status } from 'shared';
import FormTextField from '../TextField/FormTextField';
import PhoneInput from '../TextField/PhoneInput';


type SignUpFormProps = IAuthFormProps<ISignUpFormValues> & {
    handleChangePhoneInput: (value: string) => void
};

const SignUpForm: React.FC<SignUpFormProps> = ({ submitStatus, formData, isValid, handleSubmit, handleChangePhoneInput }) => {
    return (
        <form onSubmit={handleSubmit}>
            {Object.values(formData).map(({ name, label, type, value, error, touched, onBlur, onChange }) => {
                if (name === "phoneNumber") return (
                    <div key={name} className="auth-form-field-wrapper">
                        <PhoneInput
                            id={name as string}
                            name={name as string}
                            label={label}
                            type="text"
                            value={value}
                            isValid={!error}
                            isTouched={!!touched}
                            helperText={touched && error && error || ' '}
                            onBlur={onBlur}
                            onChange={handleChangePhoneInput}
                        />
                    </div>
                )
                return (
                    <div key={name} className="auth-form-field-wrapper">
                        <FormTextField
                            id={name as string}
                            name={name as string}
                            label={label}
                            type={type}
                            value={value}
                            isValid={!error}
                            isTouched={!!touched}
                            helperText={touched && error && error || ' '}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    </div>
                )
            })}
            <SubmitButton
                text='Зарегистрироваться'
                isSubmitting={submitStatus === Status.Running}
                isValid={isValid}
            />
            <Link
                to="/signin"
                className="form-redirect-link"
            >
                Войти в аккаунт
            </Link>
        </form>
    )
};

export default SignUpForm;