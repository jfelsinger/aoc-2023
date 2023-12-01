const day = +(process.env.DAY || (new Date()).getDate());

console.log(`AoC, Day ${day}`);
const inputFile = Bun.file(`day/${day}/input.txt`);
const input = await inputFile.text();

const { default: solutionFunc } = await import(`./day/${day}/solution.ts`);

function runSolution() {
    const start = performance.now() * 1000;
    const result = solutionFunc(input);
    return {
        result,
        runtime: performance.now()*1000 - start,
    }
}

const run = runSolution();
if (process.env.RUNS && !isNaN(process.env.RUNS)) {
    let start = performance.now();
    let runCount = +(process.env.RUNS);

    const runs: ReturnType<typeof runSolution>[] = [];
    while(runCount--) {
        runs.push(runSolution());
    }

    const avgRuntime = runs.reduce((acc, curr) => acc + curr.runtime, 0) / runs.length / 1000;
    console.log(`Ran solution ${runs.length} times in ${(performance.now() - start).toFixed(2)}ms, at an average of ${avgRuntime.toFixed(2)}ms per run.`);
    console.log(`Result: ${run.result}`);
}
else {
    console.log(`Got result: ${run.result} - (in ${(run.runtime / 1000).toFixed(2)}ms)`);
}
