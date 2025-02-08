import { ansiColors } from "./ansiColors";
import { getDatabase, ref, set, onValue, get, child } from "firebase/database";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import { getTerm } from "./getTerm";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(getDatabase());
const ac = ansiColors;

export const getAttendance = async (mepId) => {
  return 55;
};

export const createAttendance = async () => {
  console.log(`${ac.cyan}Creating attendance...${ac.reset}`);
  const snapshot = await get(child(dbRef, `votingsCounter/${getTerm()}`));

  let mepScores = {};
  let votingsCounter;
  if (snapshot.exists) {
    votingsCounter = snapshot.val();
  }

  const procDates = await getProcDates();
  const datesCount = procDates.length;

  // console.log("DATES", datesCount);

  const query = `https://api.sejm.gov.pl/sejm/term${getTerm()}/MP/1/votings/1/2023-11-13`;
  const mepVotes = await get(child(dbRef, `votingsCounter/${getTerm()}`));
};

const getProcDates = async () => {
  const procDates = await fetch(
    `https://api.sejm.gov.pl/sejm/term${getTerm()}/proceedings`
  );
  const procDatesData = await procDates.json();
  const meps = await getMeps();
  const allDates = {};

  try {
    for (let i = 0; i <= Object.keys(procDatesData).length; i++) {
      const procId = procDatesData[i].number;
      const dates = procDatesData[i].dates;
      if (procId) {
        allDates[procId] = dates;
      }
    }
  } catch (e) {
    console.log(e);
  }

  console.log("ALL DATES:");
  console.log(allDates);

  for (let procId = 1; procId <= Object.keys(allDates).length; procId++) {
    const procDates = allDates[procId];
    for (let date of allDates[procId]) {
      console.log(procId, date);
    }
  }

  return allDates;
};

const getMeps = async () => {
  const query = `https://api.sejm.gov.pl/sejm/term${getTerm()}/MP`;
  try {
    const meps = await fetch(query);
    const mepsData = await meps.json();
    return mepsData;
  } catch (e) {
    console.log(`${ac.red}Failed to get meps${ac.reset}`);
    console.log(e);
  }
};
