import { ansiColors } from "./ansiColors";
import { getDatabase, ref, set, onValue, get, child } from "firebase/database";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import { getTerm } from "./getTerm";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const ac = ansiColors;

export const getAttendance = async (mepId) => {
  return 55;
};

export const createAttendance = async () => {
  console.log("Creating attendance...");
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `votingsCounter/${getTerm()}`));
  let data;

  if (snapshot.exists) {
    data = snapshot.val();
  }

  // use 1-indexed procIds
  for (let procId = 3; procId < 4; procId++) {
    //prettier-ignore
    const votingsSnapshot = await get(child(dbRef, `votings/${getTerm()}/${procId}`));
    const votings = votingsSnapshot.val();
    console.log(
      `${getTerm()}/${procId} has ${Object.keys(votings).length} votings`
    );

    console.log(votings);
  }
};
