// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { createContext, useState, useEffect } from "react";
import { firebaseConfig } from "../firebaseConfig";

export const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  const [app, setApp] = useState();
  const [database, setDatabase] = useState();
  const showLogs = true;

  useEffect(() => {
    setApp(initializeApp(firebaseConfig));
    setDatabase(getDatabase(app));
  }, []);

  useEffect(() => {
    if (showLogs && app) {
      console.log("[FIRE] Initializing App...", Object.keys(app));
    }
  }, [app]);

  useEffect(() => {
    if (showLogs && database) {
      console.log("[FIRE] Fetching database...", Object.keys(database));
    }
  }, [database]);

  return (
    <FirebaseContext.Provider
      value={{
        app: app,
        database: database,
        ref: ref,
        set: set,
        onValue: onValue,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
