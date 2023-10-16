// auth.js
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase'


export const authGuard = (callback) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            callback();
        } else {
            window.location.href = "/faculty-login";
        }
    });
};
