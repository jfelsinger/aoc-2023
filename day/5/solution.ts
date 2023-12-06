let input =
`
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

type MapCheck = (val: number) => undefined | number;

export default function day5(xinput: string) {
    input = input.trim();

    const seeds = input.slice(input.indexOf(':') + 2, input.indexOf('\n')).split(' ').map(s => +s);
    const mapsPattern = /(?<=(?<from>[a-z]+)-to-(?<to>[a-z]+) map:[\n\s\d]*?)^(?<dest>\d+)(?=\s(?<source>\d+)\s(?<rangeLength>\d+))/gm;

    const maps: any = {};

    let out;
    while ((out = mapsPattern.exec(input)) !== null) {
        const { from, to } = out.groups;
        const destStart = +(out.groups.dest);
        const sourceStart = +(out.groups.source);
        const length = +(out.groups.rangeLength);

        console.log(out);
        console.log(from, to, destStart, sourceStart, length);

        if (!maps[to]) maps[to] = {};

        if (!maps[from]) maps[from] = {};
        if (!maps[from][`${to}Checks`])
            maps[from][`${to}Checks`] = [(val: number) => val] as MapCheck[]

        if (!maps[from][to]) {
            maps[from][to] = (value: number) => {
                const checks = maps[from][`${to}Checks`];
                let result = value;
                checks.find(check => {
                    const checkResult = check(value);
                    if (checkResult) {
                        result = checkResult;
                        return true;
                    }
                });

                console.log(`check ${from} to ${to}:`, value, result);
                return result;
            };
        }

        maps[from][`${to}Checks`].unshift((val: number) => {
            if (val >= sourceStart && val < sourceStart + length) {
                return destStart + (val - sourceStart);
            }
        });

        let result: any = {
            [to]: {
            },
        }

        // for (let i = 0; i < length; i++) {
        //     let source = sourceStart + i;
        //     let destination = destStart + i;

        //     if (!maps[to][`${destination}`]) maps[to][`${destination}`] = {
        //         value: destination,
        //     };

        //     if (!maps[from][`${source}`]) maps[from][`${source}`] = {
        //         value: source,
        //     };

        //     maps[from][`${source}`][`${to}Value`] = destination;
        //     maps[from][`${source}`][to] = maps[to][`${destination}`];
        // }
    }


    //const maps = { [string:

    // console.log(seeds);
    console.log(maps);
    console.log();

    const result = seeds
        .map((value) => maps.seed.soil(value))
        .map((value) => maps.soil.fertilizer(value))
        .map((value) => maps.fertilizer.water(value))
        .map((value) => maps.water.light(value))
        .map((value) => maps.light.temperature(value))
        .map((value) => maps.temperature.humidity(value))
        .map((value) => maps.humidity.location(value))

        // .map(seed => maps['seed'][seed]?.soil ?? maps['soil'][seed] ?? { value: seed })
        // .map(({ value, fertilizer }) => fertilizer ?? maps['fertilizer'][value] ?? { value })
        // .map(({ value, water }) => water ?? maps['water'][value] ?? { value })
        // .map(({ value, light }) => light ?? maps['light'][value] ?? { value })
        // .map(({ value, temperature }) => temperature ?? maps['temperature'][value] ?? { value })
        // .map(({ value, humidity }) => humidity ?? maps['humidity'][value] ?? { value })
        // .map(({ value, location }) => location ?? maps['location'][value] ?? { value })

    console.log(result);
    // return Math.min(...result.map(o => o.value));
    return Math.min(...result);
}
