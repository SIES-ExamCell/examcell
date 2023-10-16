import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBNyZPTGHfLGS1njlY6OLhb7JQtK0rvMuk",
    authDomain: "examcell-308f2.firebaseapp.com",
    projectId: "examcell-308f2",
    storageBucket: "examcell-308f2.appspot.com",
    messagingSenderId: "472244253647",
    appId: "1:472244253647:web:30900f3400718c89c098ba",
    measurementId: "G-XJXDXPT9F1"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage };