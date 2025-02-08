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
  const meps = await getMeps();

  let mepScores = {};
  let votingsCounter;
  if (snapshot.exists) {
    votingsCounter = snapshot.val();
  }

  const allDates = await getProcDates();
  console.log(allDates);

  for (let procId = 1; procId <= 2; procId++) {
    for (let date of allDates[procId]) {
      console.log(
        `${ac.yellow}Proceeding ${procId} / ${
          Object.keys(allDates).length
        }(${date})${ac.reset}`
      );

      for (let mep of meps) {
        // prettier-ignore
        if (mep.id < 4){
          const query = `https://api.sejm.gov.pl/sejm/term${getTerm()}/MP/${mep.id}/votings/${procId}/${date}`;
          const mepVotes = await fetch(query);
          let mepVotesData = await mepVotes.json();
          mepVotesData = mepVotesData.filter((voteData)=>voteData.vote !== "ABSENT");
          console.log(`Mep ${mep.id} ${mep.firstLastName} ${mepVotesData.length}`);

          if (mepScores[mep.id]){
            mepScores[mep.id] = mepScores[mep.id] + mepVotesData.length
          } else {
            mepScores[mep.id] = mepVotesData.length
          }
          
        }
      }
    }
  }

  console.log(mepScores);
};

const getProcDates = async () => {
  const procDates = await fetch(
    `https://api.sejm.gov.pl/sejm/term${getTerm()}/proceedings`
  );
  const procDatesData = await procDates.json();
  const meps = await getMeps();
  const allDates = {};

  try {
    // for (let i = 0; i <= Object.keys(procDatesData).length; i++) {
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

  return allDates;

  // MOVING
  // dates are sorted into procs because procId required anyway for query
  for (let procId = 1; procId <= 4; procId++) {
    for (let date of allDates[procId]) {
      console.log(
        `${ac.yellow}${date} Proceeding ${procId} / ${
          Object.keys(allDates).length
        }${ac.reset}`
      );

      for (let mep of meps) {
        // prettier-ignore
        if (mep.id < 6){
          const query = `https://api.sejm.gov.pl/sejm/term${getTerm()}/MP/${mep.id}/votings/${procId}/${date}`;
          const mepVotes = await fetch(query);
          const mepVotesData = await mepVotes.json();
          console.log(`Mep ${mep.id} ${mep.firstLastName} ${mepVotesData.length}`);
          
        }
      }
    }
  }
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
