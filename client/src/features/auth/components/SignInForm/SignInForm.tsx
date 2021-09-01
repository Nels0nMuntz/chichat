import { IAuthFormProps, ISignInFormValues } from 'features/auth/models';
import React from 'react';
import { Link } from 'react-router-dom';

import { Status, SubmitButton } from 'shared';
import FormTextField from '../TextField/FormTextField';


const SignInForm: React.FC<IAuthFormProps<ISignInFormValues>> = ({ submittingStatus, formData }) => {    

    return (
        <form>
            {Object.values(formData).map(({ name, label, type, value, error, touched, onBlur, onChange }) => (
                <div className="auth-form-field-wrapper">
                    <FormTextField
                        key={name}
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
            ))}
            <SubmitButton
                text='Войти в аккаунт'
                isSubmitting={submittingStatus === Status.Running}
            />
            <Link
                to="/signup"
                className="form-redirect-link"
            >
                Зарегистрироваться
            </Link>
        </form>
    )
};

export default SignInForm;