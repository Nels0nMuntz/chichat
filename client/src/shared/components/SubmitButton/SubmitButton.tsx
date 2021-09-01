import React from 'react';
import classnames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';

import style from './SubmitButton.module.scss';


type SubmitButtonProps = {
    text: string
    isSubmitting: boolean
    handleSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const SubmitButton : React.FC<SubmitButtonProps> = ({ text, isSubmitting, handleSubmit }) => {
    return (
        <button 
            type={isSubmitting ? "button" : "submit"}
            className={classnames(
                style.modalButton,
                isSubmitting && style.modalButtonLoading
            )}
            onSubmit={handleSubmit}
        >
            {isSubmitting 
                ? <CircularProgress size={22} color="inherit" className={style.buttonLoader} /> 
                : text}
        </button>
    )
};

export default SubmitButton;