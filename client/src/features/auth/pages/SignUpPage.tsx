import React from 'react';

import { AuthLayout } from 'layouts';
import SignUpContainer from '../containers/SignUpContainer';


const SignUpPage: React.FC = () => {
    return (
        <AuthLayout
            title="Регистрация"
            subtitle="Для входа в чат, вам нужно зарегистрироваться"
        >
            <SignUpContainer />
        </AuthLayout>
    )
}

export default SignUpPage;