import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { selectNotifications, removeNotification } from 'features/notification/store';
import { UniqueId } from 'shared';


let displayed: Array<UniqueId> = [];

const storeDisplayed = (key: UniqueId) => displayed.push(key);

const removeDisplayed = (key: UniqueId) => displayed = displayed.filter(item => item === key);

const useNotifier = () => {

    const dispatch = useDispatch();
    const notifications = useSelector(selectNotifications);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
    React.useEffect(() => {
        notifications.forEach(({ key, message, options, dismissed }) => {
            if(dismissed) {
                closeSnackbar(key);
                return;
            };

            if(displayed.includes(key)) {
                return;
            };

            enqueueSnackbar(
                message, 
                {
                    ...options,
                    onEmptied: () => {
                        removeDisplayed(key);
                        dispatch(removeNotification({ payload: { key } }));
                    },
                },
            );

            storeDisplayed(key);
        });
    }, [notifications]);
}

export default useNotifier;