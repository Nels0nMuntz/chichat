import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import SignInForm from '../components/SignInForm/SignInForm';
import { ISignInFormValues } from '../models';
import { FormData, signInFormValidationSchema } from 'shared';
import { signInAction, selectSigninStatus } from '../store';


const SignInContainer: React.FC = () => {

    const dispath = useDispatch();

    const submitStatus = useSelector(selectSigninStatus);

    const handleSubmit = React.useCallback((data: ISignInFormValues) => {
        dispath(signInAction({ payload: data }));
    }, []);

    const form = useFormik<ISignInFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: signInFormValidationSchema,
        onSubmit: handleSubmit,
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
    };
    
    return (
        <SignInForm
            submitStatus={submitStatus}
            formData={formData}
            isValid={form.isValid && isTouched}
            handleSubmit={form.handleSubmit}
        />
    )
};

export default SignInContainer;