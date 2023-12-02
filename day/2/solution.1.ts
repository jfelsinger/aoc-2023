const bag = {
    red: 12,
    green: 13,
    blue: 14,
}

// const input =
// `
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
// `;

export default function(input: string) {
    let total = 0;
    let result = input
        .trim()
        .split('\n')
        .map((line, i) => {
            const game = i+1;

            let passed = line
                .split(':')[1]
                .split('; ')
                    .every((pull) => {
                        let finalCubes = pull
                            .split(', ')
                            .map((cubes) => cubes.trim().split(' '))

                        if (finalCubes.every(([num, color]) => num <= bag[color]))
                            return true;
                            // total += game;

                        // return finalCubes;
                    })

            if (passed) {
                console.log('game: ', game);
                total += game;
            }
        });

    // console.log(result);
    console.log(total);
    return total;
}
