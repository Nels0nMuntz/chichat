import React from 'react';
import { SIGNIN_PAGE_URL, SIGNUP_PAGE_URL } from "./urls";
import { PublicRoute } from "shared";
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';


export const authRotes = [
    <PublicRoute key="auth-signin-page" path={SIGNIN_PAGE_URL.urlTemplate} component={SignInPage} exact />,
    <PublicRoute key="auth-signup-page" path={SIGNUP_PAGE_URL.urlTemplate} component={SignUpPage} exact />,
];