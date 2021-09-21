import React from 'react';
import { withNotification } from 'shared';

import style from "./AuthLayout.module.css";


type AuthLayoutProps = {
    title: string
    subtitle: string
    children?: React.ReactChild | React.ReactChild[]
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {

    return (
        <section className={style.wrapper}>
            <div className={style.content}>
                <h1 className={style.content_title}>{title}</h1>
                <p className={style.content_subtitle}>{subtitle}</p>
                <div className={style.content_formWrapper}>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default withNotification(AuthLayout);