// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { createContext, useState, useEffect } from "react";
import { firebaseConfig } from "../firebaseConfig";

export const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  const [app, setApp] = useState();
  const [auth, setAuth] = useState();
  const [user, setUser] = useState(); // firebase auth user object
  const [userData, setUserData] = useState(); // from user database
  const [database, setDatabase] = useState();
  const showLogs = false;

  useEffect(() => {
    setApp(initializeApp(firebaseConfig));
    setDatabase(getDatabase(app));
    setAuth(getAuth());
  }, []);

  useEffect(() => {
    if (user) {
      console.log("\u001b[1;32mLogged in as " + user.email);

      // get user from our database
      const usersRef = ref(database, `users/${user.uid}`);
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (showLogs && app) {
      console.log("Initializing App...", Object.keys(app));
    }
  }, [app]);

  useEffect(() => {
    if (showLogs && database) {
      console.log("Fetching database...", Object.keys(database));
    }
  }, [database]);

  if (auth) {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }

  return (
    <FirebaseContext.Provider
      value={{
        user: user,
        userData: userData,
        app: app,
        auth: auth,
        database: database,
        ref: ref,
        set: set,
        onValue: onValue,
        createUserWithEmailAndPassword: createUserWithEmailAndPassword,
        signInWithEmailAndPassword: signInWithEmailAndPassword,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
