import { ansiColors } from "./ansiColors";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

import { firebaseConfig } from "../firebaseConfig";
import { createAttendance } from "./getAttendance";
import { getTerm } from "./getTerm";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// gets all voting data into a big json
// no inputs required - gets the sejm term automatically and then cascades into a search
// warning - big query, use sparingly and cache
export const getVotingData = async () => {
  const ac = ansiColors;

  const termId = 10;

  // procs = proceedings
  let procs = await fetch(
    `https://api.sejm.gov.pl/sejm/term${termId}/proceedings`
  );
  let procsData = await procs.json();

  const todayDate = new Date().toISOString().slice(0, 10);

  //   remove procs with earliest date in the future
  procsData = procsData.filter((proc) => {
    const delta = new Date(proc.dates[0]) - new Date(todayDate);
    if (delta < 0) {
      return proc;
    }
  });

  let procsCount = procsData.length;
  console.log(`${ac.cyan}term${termId} - ${procsCount} proceedings`);

  let votingsCounter = [];

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
      { termId: termId, procId: i, votings: votingsInProcData.length },
    ];

    set(
      ref(db, `votingsCounter/${termId}/${i}`),
      votingsInProcData.length
    ).then((x) => {
      console.log(
        `${ac.brightYellow}Saved votingsCounter ${termId}/${i}${ac.reset}`
      );
    });
  }

  let procCount = votingsCounter.length;

  const votingData = [];
  const errorData = [];

  // DUMMY VALUES (to fetch everything, set starter to 0 and comment out below procCount assign)
  let starterProcIndex = 3;
  procCount = 4;

  // CHANGE i to 0 for PROD
  for (let i = starterProcIndex; i < procCount; i++) {
    // loop through procs counter
    votingData[i + 1] = [];
    // prettier-ignore
    console.log(`${ac.yellow}Working on proc ${i + 1}...${ac.reset}`);
    let votingsCountInProc = votingsCounter[i].votings;
    for (let j = 0; j < votingsCountInProc; j++) {
      // prettier-ignore
      const query = `https://api.sejm.gov.pl/sejm/term${termId}/votings/${i + 1}/${j + 1}`;

      const votingDetails = await fetch(query);
      if (votingDetails.status !== 200) {
        console.log(`${ac.red}${votingDetails.status}${ac.reset}`);
        errorData.push({
          termId: termId,
          procId: i + 1,
          votingId: j + 1,
          status: votingDetails.status,
        });
        break;
      }

      const votingDetailsData = await votingDetails.json(); // details of a single voting

      // incremental db updates
      set(ref(db, `votings/${i + 1}/${j + 1}`), votingDetailsData).then((x) => {
        console.log(
          `${ac.green}Saved voting data for ${i + 1}/${j + 1}.${ac.reset}`
        );
      });
    }
  }

  if (errorData.length) {
    console.log(`${ac.red}${errorData.length} errors.${errorData}`);
  }
};
