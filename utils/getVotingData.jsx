import { ansiColors } from "./ansiColors";

export const getVotingData = async () => {
  const ac = ansiColors;
  console.log(`${ac.cyan}Fetching data...${ac.reset}`);
  const dummyMepId = 200;
  const term = await fetch(`https://api.sejm.gov.pl/sejm/term10`);
  const termData = await term.json();
  const termNum = termData.num;

  // procs = proceedings
  let procs = await fetch(
    `https://api.sejm.gov.pl/sejm/term${termNum}/proceedings`
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
  console.log("procs", procsCount);

  const procNumber = 6;
  //   let votingsInProc = await fetch(
  //     `https://api.sejm.gov.pl/sejm/term10/votings/${procNumber}`
  //   );

  //   let votingsInProcData = await votingsInProc.json();

  //   console.log(
  //     `votings in term ${termNum}, proc ${procNumber}`,
  //     votingsInProcData.length
  //   );

  let votingsCounter = [];

  for (let i = 1; i <= procsCount; i++) {
    console.log(i);
    let votingsInProc = await fetch(
      `https://api.sejm.gov.pl/sejm/term10/votings/${i}`
    );

    let votingsInProcData = await votingsInProc.json();
    console.log("PROC", i, "HAS", votingsInProcData.length, "VOTINGs");
    votingsCounter = [
      ...votingsCounter,
      { procId: i, votings: votingsInProcData.length },
    ];
  }

  console.log(votingsCounter);
};
