import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCVdzmOPdlv-B2_bilZQPauqOcgnK6m7is",
    authDomain: "chichat-cc6c0.firebaseapp.com",
    projectId: "chichat-cc6c0",
    storageBucket: "chichat-cc6c0.appspot.com",
    messagingSenderId: "325453470897",
    appId: "1:325453470897:web:6ff804cddeef57eb411690"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);