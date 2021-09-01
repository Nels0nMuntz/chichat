import React from 'react';
import { useFormik } from 'formik';

import { ISignUpFormValues } from '../models';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import { FormData, signUpFormValidationSchema, Status } from 'shared';

const SignUpContainer : React.FC = () => {

    const form = useFormik<ISignUpFormValues>({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            password: '',
            passwordRepeat: '',
        },
        validationSchema: signUpFormValidationSchema,
        onSubmit: values => console.log(values),
    });

    const formData: FormData<ISignUpFormValues> = {
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
        firstName: {
            name: 'firstName',
            label: 'Имя',
            type: 'text',
            value: form.values.firstName,
            error: form.errors.firstName,
            touched: form.touched.firstName,
            onBlur: form.handleBlur,
            onChange: form.handleChange,
        },
        lastName: {
            name: 'lastName',
            label: 'Фамилия',
            type: 'text',
            value: form.values.lastName,
            error: form.errors.lastName,
            touched: form.touched.lastName,
            onBlur: form.handleBlur,
            onChange: form.handleChange,
        },
        phoneNumber: {
            name: 'phoneNumber',
            label: 'Номер телефона',
            type: 'text',
            value: form.values.phoneNumber,
            error: form.errors.phoneNumber,
            touched: form.touched.phoneNumber,
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
        passwordRepeat: {
            name: 'passwordRepeat',
            label: 'Повторите пароль',
            type: 'password',
            value: form.values.passwordRepeat,
            error: form.errors.passwordRepeat,
            touched: form.touched.passwordRepeat,
            onBlur: form.handleBlur,
            onChange: form.handleChange,
        }
    };

    return (
        <SignUpForm
            submittingStatus={Status.Initial}
            formData={formData}
        />
    )
};

export default SignUpContainer;
