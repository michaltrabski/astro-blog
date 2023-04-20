import React, { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, onSnapshot, getDoc } from "firebase/firestore";
import { signIn } from "../utils/utils";

export default function Messages() {
  const [user, setUser] = useState<any | null>(null);
  const [singleFirebaseDocument, setSingleFirebaseDocument] = useState<any | null>(null);

  const singleFirebaseDocumentArr = singleFirebaseDocument ? Object.entries(singleFirebaseDocument) : [];

  useEffect(() => {
    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://firebase.google.com/docs/web/learn-more#config-object
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

    signIn(auth).then((res) => {
      console.log(111111111, res)
      setUser(res.user);
    });

    const unsub = onSnapshot(doc(db, "messages", "messages"), (doc) => {
      const data = doc.data();
      console.log("Current data: ", data);

      setSingleFirebaseDocument(data);
    });
  }, []);

  return (
    <div>
      <h1>Auth</h1>
      <p>user.uid = {user?.uid}</p>
      {/* <pre>userData = {JSON.stringify(singleFirebaseDocument, null, 2)}</pre> */}

      {singleFirebaseDocumentArr.map((documentProperty) => {
        const [key, value] = documentProperty as [string, any];

        return (
          <div key={key}>
            <p>
              {key} === {JSON.stringify(value)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
