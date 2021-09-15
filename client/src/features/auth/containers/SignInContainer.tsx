import React from 'react';
import { useFormik } from 'formik';

import SignInForm from '../components/SignInForm/SignInForm';
import { ISignInFormValues } from '../models';
import { FormData, signInFormValidationSchema, Status } from 'shared';


const SignInContainer: React.FC = () => {

    const form = useFormik<ISignInFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: signInFormValidationSchema,
        onSubmit: values => console.log(values),
    });

    const isTouched = !!Object.keys(form.touched).length;
    
    const formData: FormData<ISignInFormValues> = {
        email: {
            name: 'email',
            label: 'E-mail',
            type: 'text',
            value: form.values.email,
            error: form.errors.email,
            touched: form.touched.email,
            onBlur: form.handleBlur,
            onChange: form.handleChange,
        },
        password: {
            name: 'password',
            label: 'Пароль',
            type: 'password',
            value: form.values.password,
            error: form.errors.password,
            touched: form.touched.password,
            onBlur: form.handleBlur,
            onChange: form.handleChange,
        },
    }
    
    return (
        <SignInForm
            submittingStatus={Status.Initial}
            formData={formData}
            isValid={form.isValid && isTouched}
            handleSubmit={form.handleSubmit}
        />
    )
};

export default SignInContainer;