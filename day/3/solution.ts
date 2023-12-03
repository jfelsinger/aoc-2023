export default function(input: string) {
    const width = input.indexOf('\n');
    let total = 0, index = 0;

    do {
        index = input.indexOf('*', index);
        const surroundingIndices = [
            // ... Top 3,
            index - (width + 2),
            index - (width + 1),
            index - (width + 0),
            // .*. Left and right
            index - 1,
            index + 1,
            // ... Bottom 3
            index + (width + 0),
            index + (width + 1),
            index + (width + 2),
        ];

        const surrounding =
            surroundingIndices
                // .filter(index => input[index] !== '.')
                .filter((index, i, arr) =>
                    input[index] !== '.' &&
                    // This is equivalent to the below commented filter,
                    // moving it here, in this messy way, speeds things up.
                    (
                        i === 0 ||
                        (input[arr[i - 1]] === '.' || arr[i - 1] !== index - 1)
                    )
                )
                .map(index => ({ index, character: input[index] }))
                // .filter((o, i, arr) => {
                //     if (i <= 0) return true;
                //     return arr[i - 1].index !== o.index - 1;
                // });

        if (surrounding.length === 2) {
            const first = traverseNumber(surrounding[0].index, input);
            const second = traverseNumber(surrounding[1].index, input);
            const ratio = first * second;
            total += ratio;
        }

        index++;
    }
    while (index > 0);

    return total;
}

function traverseNumber(index: number, input: string) {
    let digits = input[index];

    // Check for digits behind
    let cursor = index - 1;
    while (input.charCodeAt(cursor) >= 48 && input.charCodeAt(cursor) <= 57)
    {
        digits = input[cursor] + digits;
        cursor--;
    }

    // Check for digits ahead
    cursor = index + 1;
    while (input.charCodeAt(cursor) >= 48 && input.charCodeAt(cursor) <= 57)
    {
        digits += input[cursor];
        cursor++;
    }

    return +digits;
}

// // This works nice, but is slower.
// const findNumbers = /(?<=(\d*))\d+/gm;
// function traverseNumberRegex(index: number, input: string) {
//     findNumbers.lastIndex = index;
//     const out = findNumbers.exec(input);
//     const digits = out[1] + out[0];
//     return {
//         digits,
//         value: +digits,
//     }
// }
