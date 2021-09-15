import React from 'react';
import classnames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';

import style from './SubmitButton.module.scss';


type SubmitButtonProps = {
    text: string
    isSubmitting: boolean
    isValid: boolean
}

const SubmitButton : React.FC<SubmitButtonProps> = ({ text, isSubmitting, isValid }) => {
    return (
        <button 
            type={isValid ? "submit" : "button"}
            className={classnames(
                style.modalButton,
                isSubmitting && style.loading,
                !isValid && style.disabled,
            )}
        >
            {isSubmitting 
                ? <CircularProgress size={22} color="inherit" className={style.buttonLoader} /> 
                : text}
        </button>
    )
};

export default SubmitButton;