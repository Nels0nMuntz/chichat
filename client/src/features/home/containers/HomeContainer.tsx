import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Home from '../components/Home/Home';
import { fetchInitDataAction } from '../store/actions';
import {
    selectHomeStatus,
    selectActiveDialog,
} from '../store/selectors';


const HomeContainer: React.FC = () => {

    const dispatch = useDispatch();

    const homeStatus = useSelector(selectHomeStatus);
    const selectedDialog = useSelector(selectActiveDialog);

    React.useEffect(() => {
        dispatch(fetchInitDataAction({}));
        // try {
        //     const ws = new WebSocket('ws://localhost:3000');
        //     console.log(ws);            
        //     ws.onopen = function (this: WebSocket) {
        //         console.log('client socket is opened');
        //         ws.send(JSON.stringify({ message: "User message" }));
        //     };
        //     ws.onmessage = function (event) {
        //         let message = event.data;
        //         console.log(message);
        //         // const fileReader = new FileReader();
        //         // fileReader.readAsArrayBuffer(message);
        //         // fileReader.onload = function () {
        //         //     console.log(fileReader.result);
        //         // }
        //     }
        // } catch (error: any) {
        //     console.log(error);
        // };
    }, []);

    return (
        <Home
            status={homeStatus}
            selectedDialogMember={selectedDialog?.member || null}
        />
    )
};

export default HomeContainer;