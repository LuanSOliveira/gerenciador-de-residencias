import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCnsfHW7LqhN-P-nTdsYaB4lXrt7EG4Xw",
  authDomain: "gerenciador-de-casas.firebaseapp.com",
  projectId: "gerenciador-de-casas",
  storageBucket: "gerenciador-de-casas.appspot.com",
  messagingSenderId: "357041227550",
  appId: "1:357041227550:web:6b9175fd171a59cdd4eb0f",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const casasCollectionRef = collection(db, "casas")
export const locatariosCollectionRef = collection(db, "locatarios")