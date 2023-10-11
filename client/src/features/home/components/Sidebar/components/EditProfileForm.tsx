import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux";

import { selectProfileDraft, setProfileFirstname } from "features/home/store";

import styles from "../Sidebar.module.scss"

const useStyles = makeStyles({
    root: {
        width: "100%",
        '& .MuiInputBase-root': {
            color: "var(--color-text)",
        },
        '& .MuiInputLabel-outlined': {
            color: "var(--color-text)",
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
            color: "var(--color-text)",
            '&.Mui-focused': {
                color: 'transparent',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
            },
        },
        '& .MuiOutlinedInput-adornedEnd': {
            paddingRight: '15px',
            '& .MuiIconButton-edgeEnd': {
                padding: '10px',
                '& + img': {
                    marginLeft: '10px',
                },
            },
        },
        '& .MuiOutlinedInput-notchedOutline': {

        }
    },
});

const EditProfileForm = React.memo(() => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const values = useSelector(selectProfileDraft);
    const onFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setProfileFirstname({ payload: e.target.value }))
    }
    const onLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setProfileFirstname({ payload: e.target.value }))
    }
    return (
        <form className={styles.EditProfileForm}>
            <TextField
                id='profile-firstname'
                name='firstname'
                variant='outlined'
                label="Firstname"
                className={classes.root}
                value={values.firstname}
                onChange={onFirstnameChange}
            />
            <TextField
                id='profile-lastname'
                name='lastname'
                variant='outlined'
                label="Lastname"
                className={classes.root}
                value={values.lastname}
                onChange={onLastnameChange}
            />
        </form>
    );
});

export default EditProfileForm;
