import { ansiColors } from "./ansiColors";
import { getDatabase, ref, set, onValue, get, child } from "firebase/database";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const ac = ansiColors;

export const getAttendance = async (mepId) => {
  return 55;
};

export const createAttendance = async () => {
  console.log("Creating attendance...");
  const dbRef = ref(getDatabase());
  get(child(dbRef, `votingsCounter/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
