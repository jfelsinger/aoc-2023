const bag = {
    red: 12,
    green: 13,
    blue: 14,
}

const input =
`
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

export default function(input: string) {
    let total = 0;
    let result = input
        .trim()
        .split('\n')
        .forEach((line, i) => {
            const game = i+1;

            const min = {
                red: 1,
                green: 1,
                blue: 1,
                power: 0,
            };

            let pulls = line
                .split(':')[1]
                .split('; ')
                .forEach((pull) => {
                    let finalCubes = pull
                        .split(', ')
                        .map((cubes) => {
                            let result = cubes.trim().split(' ');
                            result[0] = +result[0];
                            return result;
                        })

                    finalCubes.forEach(([num, color]) => {
                        if (num > min[color]) {
                            min[color] = num;
                        }
                    });

                    return finalCubes;
                })

            min.power = min.red * min.green * min.blue;
            total += min.power;

            console.log(min);
            console.log();

            return min;
        });

    // console.log(result);
    // console.log(total);
    return total;
}
