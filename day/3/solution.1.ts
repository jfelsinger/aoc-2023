// const input =
// `
// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`.trim();

// 0123456789
// .........X

export default function(input: string) {
    console.log();

    const data = input.trim().split('\n');
    const width = data[0].length;
    const height = data.length;

    const pattern = getPattern(width);
    const p2 = /[0-9]/;

    let total = 0;

    let out;
    while ((out = pattern.exec(input))) {
        let num = out[0];
        const numIndex = pattern.lastIndex - 1;

        // Check for digit behind
        let cursor = numIndex - 1;
        while (p2.test(input[cursor]))
        {
            num = input[cursor] + num;
            cursor--;
        }

        // Check for digits ahead
        cursor = numIndex + 1;
        while (p2.test(input[cursor]))
        {
            num += input[cursor];
            cursor++;
        }

        // Update the regex's position
        pattern.lastIndex = cursor;

        total += +num;
        console.log('out: ', out, num);
    }

    console.log(width, height);

    return total;
}

function getPattern(width: number) {
    // not a newline, not a digit, not a period (.)
    const pSymbol = '([^\\d.\\n])';
    const gap = `(?:.|\\n){${width - 1},${width + 1}}`;

    return new RegExp(
        // A positive look behind, is a digit preceeded by a symbol or a proper
        // amount of gap characters to denote having one top/diagnol to it.
        `(?<=(?:${pSymbol}|${pSymbol}${gap}))\\d` +
        `|` +
        // A positive look ahead, is a digit followed by a symbol or a proper
        // amount of gap characters to denote having one top/diagnol to it.
        `\\d(?=(?:${pSymbol}|${gap}${pSymbol}))`
    , 'gm');
}
