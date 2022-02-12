import React from 'react';

import { AuthLayout } from 'layouts';
import SignInContainer from '../containers/SignInContainer';


const SignInPage: React.FC = React.memo(() => {
    return (
        <AuthLayout
            title="Войти в аккаунт"
            subtitle="Пожалуйста, войдите в свой аккаунт"
        >
            <SignInContainer />
        </AuthLayout>
    )
});

export default SignInPage;