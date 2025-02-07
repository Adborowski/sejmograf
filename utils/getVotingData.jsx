import { ansiColors } from "./ansiColors";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

import { firebaseConfig } from "../firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const getVotingData = async () => {
  const ac = ansiColors;
  console.log(`${ac.cyan}Fetching data...${ac.reset}`);
  const term = await fetch(`https://api.sejm.gov.pl/sejm/term10`);
  const termData = await term.json();
  const termId = termData.num;

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
  console.log("procsCount", procsCount);

  let votingsCounter = [];

  for (let i = 1; i <= procsCount; i++) {
    let votingsInProc = await fetch(
      `https://api.sejm.gov.pl/sejm/term10/votings/${i}`
    );

    if (votingsInProc.status !== 200) {
      console.log(ac.red, votingsInProc.status, ac.reset);
    }

    let votingsInProcData = await votingsInProc.json();
    votingsCounter = [
      ...votingsCounter,
      { termId: termId, procId: i, votings: votingsInProcData.length },
    ];
  }

  const procCount = votingsCounter.length;

  console.log(
    `Total votings in term ${termId}: ${votingsCounter.reduce(
      (a, c) => a + c.votings,
      0
    )} in ${procCount} proceedings.`
  );

  const votingData = {};

  for (let i = 0; i < procCount; i++) {
    // loop through procs counter
    votingData[i + 1] = {};
    const votingsCountInProc = votingsCounter[i].votings;
    for (let j = 0; j < votingsCountInProc; j++) {
      votingData[i + 1][
        j + 1
      ] = `https://api.sejm.gov.pl/sejm/term${termId}/votings/${i + 1}/${
        j + 1
      }`;
      // votingData[i + 1] = `https://api.sejm.gov.pl/sejm/term${termId}/votings/${
      //   i + 1
      // }/${j + 1}`;
      // inside proc, loop through votings counter
      // console.log(
      //   `https://api.sejm.gov.pl/sejm/term${termId}/votings/${i + 1}/${j + 1}`
      // );
    }
  }

  console.log(votingData);
};
