import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUVZfgBV8is1LFS7hKC60BpzSYJGmNGiw",
    authDomain: "maintenance-ticket.firebaseapp.com",
    projectId: "maintenance-ticket",
    storageBucket: "maintenance-ticket.appspot.com",
    messagingSenderId: "805001665560",
    appId: "1:805001665560:web:75fd9ec0cf79fe1639776d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initizile database
export const db = getDatabase(app);