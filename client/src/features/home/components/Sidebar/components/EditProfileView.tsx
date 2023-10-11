import React from 'react';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckIcon from '@mui/icons-material/Check';

import style from '../Sidebar.module.scss';
import { Avatar, uploadFiles } from 'shared';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectProfile,
    selectUser,
    setProfileEditModeAction,
    setProfilePhoto,
    resetProfile,
    IProfileState,
    selectIsDraftDifferent,
    updateProfile,
} from 'features/home/store';
import EditProfileForm from './EditProfileForm';
import classNames from 'classnames';
import { openNotification } from 'features/notification/store';
import { IDialogFormAttach } from 'features/home/models';


const StyledIconButton = withStyles({
    root: {
        padding: '8px',
        '&:hover': {
            backgroundColor: 'var(--touche-ripple-hover)',
        },
        '& .MuiSvgIcon-root': {
            fill: 'var(--color-text-100)',
        },
    },
})(IconButton);

const EditProfileView = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const profile = useSelector(selectProfile);
    const showSaveButton = useSelector(selectIsDraftDifferent);
    const closeProfileEditView = () => {
        dispatch(setProfileEditModeAction({ payload: false }));
        dispatch(resetProfile({}));
    };
    const handleChangeUploadInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;
        if (!files?.length) return;
        try {
            const uploadResult = uploadFiles(files) as IDialogFormAttach[];
            dispatch(
                setProfilePhoto({ 
                    payload:  {
                        previewUrl: uploadResult[0].previewLink || '',
                        file: files[0],
                    }
                })
            );
            event.target.value = '';
        } catch (error: any) {
            dispatch(
                openNotification({
                    payload: { message: error.message, variant: 'error' },
                })
            );
        }
    };
    const handleSaveChanges = () => {
        dispatch(updateProfile({}))
    };

    const userData = {
        firstName: user.firstName,
        lastnName: user.lastName,
        avatar: profile.draft.photo,
    };

    return (
        <Stack direction='column' gap={2} className={style.EditProfile}>
            <header className={style.sidebar_header}>
                <StyledIconButton size='small' onClick={closeProfileEditView}>
                    <ArrowBackIcon fontSize='medium' />
                </StyledIconButton>
                <h3 className={style.EditProfile_heading}>Edit profile</h3>
            </header>
            <Stack direction='column' alignItems='center' gap={2}>
                <div className={style.EditProfile_avatar}>
                    <label
                        className={style.EditProfile_avatar}
                        role='button'
                        title='Edit your profile photo'
                    >
                        <input
                            type='file'
                            accept='image/png, image/jpeg'
                            title='Edit your profile photo'
                            onChange={handleChangeUploadInput}
                        />
                        <AddAPhotoIcon
                            className={style.EditProfile_addAvatarIcon}
                            fontSize='large'
                        />
                        <Avatar user={userData} size='large' />
                    </label>
                </div>
                <EditProfileForm />
            </Stack>
            <IconButton
                className={classNames([
                    style.EditProfile_saveBtn,
                    showSaveButton && style.EditProfile_saveBtnVisible,
                ])}
                aria-label='save changes'
                onClick={handleSaveChanges}
            >
                <CheckIcon />
            </IconButton>
        </Stack>
    );
};

export default EditProfileView;
