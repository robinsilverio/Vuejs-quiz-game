import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDEV-ZAubBU2hhmBNLaYNd42xVRBbRgqPs",
    authDomain: "vue-quizapp.firebaseapp.com",
    databaseURL: "https://vue-quizapp-default-rtdb.firebaseio.com",
    projectId: "vue-quizapp",
    storageBucket: "vue-quizapp.appspot.com",
    messagingSenderId: "220342427388",
    appId: "1:220342427388:web:8308e7f366c59570948179",
    measurementId: "G-T1BYTHZ5KH"
};

const firebaseApp = firebase.initializeApp(config);
export const db = firebaseApp.firestore();
