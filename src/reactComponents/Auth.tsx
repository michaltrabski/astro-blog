import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function Auth() {
  const [user, setUser] = useState<any | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

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

    onAuthStateChanged(auth, (user) => {
      console.log(111111111111111111, "onAuthStateChanged user", user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user);

        (async () => {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setUserData(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })();
      } else {
        setUser(null);
      }
    });

    //     createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    //   });

    signInWithEmailAndPassword(auth, "michal.trabski+4@gmail.com", "123123")
      .then((userCredential) => {
        // Signed in

        console.log(111111111111111111, "userCredential", userCredential);
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }, []);

  return (
    <div>
      <h1>Auth</h1>

      <p>user.uid = {user?.uid}</p>

      <pre>userData = {JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}
