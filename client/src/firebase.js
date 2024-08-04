
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCKAIF9Yjv8GQsK37zGQZieTO_oxbdlzDs",
    authDomain: "jarvis-ai-4c589.firebaseapp.com",
    projectId: "jarvis-ai-4c589",
    storageBucket: "jarvis-ai-4c589.appspot.com",
    messagingSenderId: "894806089939",
    appId: "1:894806089939:web:ea4d2c460a1566e64e3426",
    // measurementId: "G-89VM3P1QES"
};

export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

