//  1..  ..0  11.  .1.  .11
//  .*.  0*0  0*0  0*0  0*0
//  ...  000  000  000  000

//  ...  000
//  1*.  .*0
//  ...  000

//  ...  000
//  .*1  .*0
//  ...  000

//  ...  000  000  000  000
//  .*.  0*0  0*0  0*0  0*0
//  1..  ..0  11.  .1.  .11

export default function(input: string) {
    const width = input.indexOf('\n');
    let total = 0, index = input.indexOf('*');

    while (index >= 0) {
        const surroundingIndices = [
            index - (width + 2),
            index - (width + 1),
            index - (width + 0),
            index - 1,
            index + 1,
            index + (width + 0),
            index + (width + 1),
            index + (width + 2),
        ];

        let firstIndex = 0;
        let secondIndex = 0;
        let i = 0;

        while (firstIndex === 0) {
            if (input[surroundingIndices[i++]] !== '.') {
                firstIndex = surroundingIndices[i - 1];
                break;
            }
        }

        outsideSwitch: switch(i) {
            case 3:
            case 4:
            case 5:
                while (i < surroundingIndices.length) {
                    if (input[surroundingIndices[i]] !== '.') {
                        secondIndex = surroundingIndices[i];
                        break outsideSwitch;
                    }
                    i++;
                }
                break;

            default:
                while (i < surroundingIndices.length) {
                    if (input[surroundingIndices[i]] !== '.') {
                        if (
                            input[surroundingIndices[i - 1]] === '.' ||
                            surroundingIndices[i - 1] !== surroundingIndices[i] - 1
                        ) {
                            secondIndex = surroundingIndices[i];
                            break outsideSwitch;
                        }
                    }
                    i++;
                }
                break;
        }

        if (secondIndex) {
            const first = traverseNumber(firstIndex, input);
            const second = traverseNumber(secondIndex, input);
            const ratio = first * second;
            total += ratio;
        }

        index = input.indexOf('*', index + 1);
    }

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
