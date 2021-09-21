import React from 'react';
import { makeStyles } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import MuiPhoneNumber from "material-ui-phone-number";

import style from "./FormTextField.module.scss";
import errorImg from "assets/img/error.svg"
import successImg from "assets/img/success.svg"


const useStyles = makeStyles({
    root: {
        '& label.Mui-focused': {
            color: '#4CA5FF',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#DDDDDD',
            },
            '&:hover fieldset': {
                borderColor: '#B8B8B8',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#4CA5FF',
            },
        },
        '& .MuiFormHelperText-root': {
            marginTop: '2px',
            marginBottom: '5px',
            lineHeight: '1.25',
            fontStyle: 'italic',
            color: '#f44336',
            '&.Mui-focused': {
                color: 'transparent',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
            }
        },
        '& .MuiOutlinedInput-adornedEnd': {
            paddingRight: "15px",
            '& .MuiIconButton-edgeEnd': {
                padding: "10px",
                '& + img': {
                    marginLeft: "10px"
                }
            }
        }
    }
});

type PhoneInputProps = {
    id: string
    label: string
    type: 'text'
    name: string
    value: string
    helperText: string
    isTouched: boolean
    isValid: boolean
    onChange: (value: string) => void
    onBlur: (e: React.ChangeEvent<any>) => void
};

const PhoneInput: React.FC<PhoneInputProps> = ({ id, label, type, name, value, helperText, isTouched, isValid, onChange, onBlur }) => {

    const classes = useStyles();

    return (
        <MuiPhoneNumber
            id={id}
            name={name}
            label={label}
            type={type}
            value={value}
            helperText={helperText}
            onChange={value => onChange(value)}
            onBlur={onBlur}
            error={!isValid && isTouched}
            variant="outlined"
            fullWidth
            className={classes.root}
            defaultCountry='ua'
            onlyCountries={['ua', 'ru']}
            InputProps={{
                endAdornment: !isTouched ? null : (
                    <InputAdornment position="end" >
                        {isValid ? (
                            <img className={style.endImage} src={successImg} alt="success" />
                        ) : (
                            <img className={style.endImage} src={errorImg} alt="error" />
                        )}
                    </InputAdornment>
                )
            }}
        // InputProps={
        //     !isTouched ? null : ({
        //         endAdornment:
        //             <InputAdornment position="end" >
        //                 {isValid ? (
        //                     <img className={style.endImage} src={successImg} alt="success" />
        //                 ) : (
        //                     <img className={style.endImage} src={errorImg} alt="error" />
        //                 )}
        //             </InputAdornment>
        //     })
        // }
        />
    )
}

export default PhoneInput
