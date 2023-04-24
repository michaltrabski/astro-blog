import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { getDataFromEndpoint, _initializeDbAndAuth } from "../store/store";

export default function GetDataFromEndpointComponent() {
  useEffect(() => {

    const firebaseConfig = {
      apiKey: "AIzaSyB5URsFrQos2JW2psYkja9f84m-Kn-Caaw",
      authDomain: "prawojazdy-a20bd.firebaseapp.com",
      projectId: "prawojazdy-a20bd",
      storageBucket: "prawojazdy-a20bd.appspot.com",
      messagingSenderId: "706828517872",
      appId: "1:706828517872:web:56c06206eefeb42cfedd35",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    _initializeDbAndAuth(db, auth);

    getDataFromEndpoint();
  }, []);

  return null;
}
