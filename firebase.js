import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyA9mLuCSfHewu7vJKTlaP0oeDU2U6yWXfo",

  authDomain: "c-reunion.firebaseapp.com",

  projectId: "c-reunion",

  storageBucket: "c-reunion.firebasestorage.app",

  messagingSenderId: "749604237962",

  appId: "1:749604237962:web:a3b3013bc144a92518f373"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);