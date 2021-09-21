import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { ISignUpFormValues } from '../models';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import { FormData, signUpFormValidationSchema } from 'shared';
import { SignUpUserDto } from '../dtos';
import { signUpAction, selectSignupStatus, selectSignUpErrors } from '../store';

const SignUpContainer: React.FC = () => {

    const dispatch = useDispatch();

    const signUpStatus = useSelector(selectSignupStatus);
    const serverValidationErrors = useSelector(selectSignUpErrors);

    const handleSubmit = React.useCallback((data: ISignUpFormValues) => {
        const user = new SignUpUserDto(data);
        dispatch(signUpAction({ payload: { ...user } }));
    }, []);

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
        onSubmit: handleSubmit,
    });

    const onChangePhoneInput = (value: string) => {       
        form.setFieldValue('phoneNumber',value);
    };

    const isTouched = !!Object.keys(form.touched).length;

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

    React.useEffect(() => {
        if(serverValidationErrors){
            form.setErrors(serverValidationErrors);
        };  
    }, [serverValidationErrors]);

    return (
        <SignUpForm
            submitStatus={signUpStatus}
            formData={formData}
            isValid={form.isValid && isTouched}
            handleSubmit={form.handleSubmit}
            handleChangePhoneInput={onChangePhoneInput}
        />
    )
};

export default SignUpContainer;
