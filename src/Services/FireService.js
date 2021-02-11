import firebase from 'firebase';
import "firebase/auth";

const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyC9C6ykMC9yyfl-wSmyewjpxzXuj0Jq2Fc",
        authDomain: "reviewapp-a5975.firebaseapp.com",
        projectId: "reviewapp-a5975",
        storageBucket: "reviewapp-a5975.appspot.com",
        messagingSenderId: "871884958406",
        appId: "1:871884958406:web:d30f57be356a9663d085c7"
    }
);

const db = app.firestore();
const auth = app.auth();
export { auth,db };
export default app;