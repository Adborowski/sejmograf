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

  for (let procId = 2; procId <= Object.keys(votingsCounter).length; procId++) {
    for (let date of allDates[procId]) {
      console.log(
        `${ac.yellow}Proceeding ${procId} / ${
          Object.keys(allDates).length
        }            ${date}${ac.reset}`
      );

      for (let mep of meps) {
        // prettier-ignore
        if (mep.id){
          const query = `https://api.sejm.gov.pl/sejm/term${getTerm()}/MP/${mep.id}/votings/${procId}/${date}`;
          const mepVotes = await fetch(query);
          let mepVotesData = await mepVotes.json();
          // mepVotesData = mepVotesData.filter((voteData)=>voteData.vote !== "ABSENT");
          console.log(`Mep ${mep.id} ${mep.firstLastName} ${mepVotesData.length}`);

          if (mepScores[mep.id]){
            mepScores[mep.id] = mepScores[mep.id] + mepVotesData.length
          } else {
            mepScores[mep.id] = mepVotesData.length
          }

          // set(ref(db, `attendance/${getTerm()}/${mep.id}`), mepScores[mep.id]).then((res)=>{
          //   // console.log(`${ac.green} Updated attendance: [${mep.id}] ${mep.firstLastName}, score ${mepScores[mep.id]} ${ac.reset}`)
          // }).catch((e)=>{
          //   console.log(`${ac.red}Error saving attendance.${ac.reset}`)
          //   console.log(e);
          // });
          
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
  let procDatesData = await procDates.json();
  procDatesData = procDatesData.filter((datum) => datum.number);
  const allDates = {};

  try {
    for (let i = 0; i < Object.keys(procDatesData).length; i++) {
      const procId = procDatesData[i].number;
      let dates = procDatesData[i].dates;
      if (procId) {
        allDates[procId] = dates;
      }
    }
  } catch (e) {
    console.log(`${ac.red}Failed to get proc dates.`);
    console.log(e);
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
