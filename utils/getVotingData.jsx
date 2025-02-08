import { ansiColors } from "./ansiColors";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  get,
  child,
} from "firebase/database";
import { initializeApp } from "firebase/app";

import { firebaseConfig } from "../firebaseConfig";
import { createAttendance } from "./getAttendance";
import { getTerm } from "./getTerm";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(getDatabase());
const ac = ansiColors;

// gets all voting data into a big json
// no inputs required - gets the sejm term automatically and then cascades into a search
// warning - big query, use sparingly and cache
export const getVotingData = async () => {
  console.log(`${ac.yellow}Getting voting data.${ac.reset}`);
  // procs = proceedings
  let procs = await fetch(
    `https://api.sejm.gov.pl/sejm/term${getTerm()}/proceedings`
  );
  let procsData = await procs.json();
  const todayDate = new Date().toISOString().slice(0, 10);

  //   remove procs with earliest date in the future
  procsData = procsData.filter((proc) => {
    const delta = new Date(proc.dates[0]) - new Date(todayDate);
    if (delta < 0 && proc.number) {
      return proc;
    }
  });

  let procsCount = procsData.length;

  console.log(`${ac.cyan}term${getTerm()} - ${procsCount} proceedings`);

  let votingsCounter = [];
  let savedVotingsCount = 0;

  for (let i = 1; i <= procsCount; i++) {
    let votingsInProc = await fetch(
      `https://api.sejm.gov.pl/sejm/term${getTerm()}/votings/${i}`
    );

    if (votingsInProc.status !== 200) {
      console.log(ac.red, votingsInProc.status, ac.reset);
    }

    let votingsInProcData = await votingsInProc.json();

    votingsCounter = [
      ...votingsCounter,
      { termId: getTerm(), procId: i, votings: votingsInProcData.length },
    ];

    set(
      ref(db, `votingsCounter/${getTerm()}/${i}`),
      votingsInProcData.length
    ).then((x) => {
      savedVotingsCount++;
      if (savedVotingsCount === votingsInProc.length) {
        console.log(
          `${
            ac.yellow
          }Saved votingsCounter for ${getTerm()}/${i} (${savedVotingsCount} votings)`
        );
      }
    });
  }

  let procCount = votingsCounter.length;

  const votingData = [];
  const errorData = [];

  // DUMMY VALUES (to fetch everything, set starter to 0 and comment out below procCount assign)
  let starterProcIndex = 21;
  procCount = 23;

  // CHANGE i to 0 for PROD
  for (let i = starterProcIndex; i < procCount; i++) {
    // loop through procs counter
    votingData[i + 1] = [];
    // prettier-ignore
    console.log(`${ac.yellow}Working on proc ${i + 1}...${ac.reset}`);
    let votingsCountInProc = votingsCounter[i].votings;
    for (let j = 0; j < votingsCountInProc; j++) {
      // prettier-ignore
      const query = `https://api.sejm.gov.pl/sejm/term${getTerm()}/votings/${i + 1}/${j + 1}`;

      const votingDetails = await fetch(query);
      if (votingDetails.status !== 200) {
        console.log(`${ac.red}${votingDetails.status}${ac.reset}`);
        errorData.push({
          termId: getTerm(),
          procId: i + 1,
          votingId: j + 1,
          status: votingDetails.status,
          query: query,
        });
        break;
      }

      const votingDetailsData = await votingDetails.json(); // details of a single voting

      // incremental db updates
      set(
        ref(db, `votings/${getTerm()}/${i + 1}/${j + 1}`),
        votingDetailsData
      ).then((x) => {
        console.log(
          `${ac.green}Saved voting data for ${i + 1}/${j + 1}.${ac.reset}`
        );
      });
    }
  }

  if (errorData.length) {
    console.log(`${ac.red}Fetched data with ${errorData.length} errors.`);
    console.log(errorData);
  }
};

export const wipeVotingData = async () => {
  console.log(`${ac.red}Wiping data.`);
  let snapshot;
  let data;
  try {
    snapshot = await get(child(dbRef, `votingsCounter/${getTerm()}`));
    if (snapshot.exists) {
      data = snapshot.val();
    }
  } catch (e) {
    console.log(e);
  }

  for (let i = 1; i <= Object.keys(data).length; i++) {
    set(ref(db, `votings/${i}`), {}).catch((e) => {
      console.log(`${ac.red}Error wiping data${ac.reset}`);
      console.log(e);
    });
  }
};
