const input =
`
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;

// import input from './input.txt';
// console.log('input: ', input);

// const wordDigit = /(?:(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine))|([^0-9\n])/g;
const wordDigit = /(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|([0-9])/g;
const nonDigit = /([^0-9\n])/g;

function replacer(match, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
    console.log(p1, p2, p3, p4, p5, p6, p7, p8, p9);
    switch(true) {
        case !!p1:
            console.log('1: ', match);
            return 1;
        case !!p2:
            console.log('2: ', match);
            return 2;
        case !!p3:
            console.log('3: ', match);
            return 3;
        case !!p4:
            console.log('4: ', match);
            return 4;
        case !!p5:
            console.log('5: ', match);
            return 5;
        case !!p6:
            console.log('6: ', match);
            return 6;
        case !!p7:
            console.log('7: ', match);
            return 7;
        case !!p8:
            console.log('8: ', match);
            return 8;
        case !!p9:
            console.log('9: ', match);
            return 9;
    }

    console.log('uh: ', match);
    return match;
    // return '';
}

const result = input.trim()
    .split('\n')
    .map(line => ({
        line,
        val: line.replaceAll(wordDigit, replacer).replace(nonDigit, ''),
    }))
    // .replace(wordDigit, replacer)
    .map(({ line, val }) => ({
        line,
        replaced: val,
        val: +(val[0] + val[val.length - 1])
    }))
    // .reduce((acc, curr) => {
    //     const sum = curr.val + acc;
    //     console.log(`${acc} + ${curr.val} = ${sum}`)
    //     return sum;
    // }, 0)
    .reduce((acc, curr) => (curr.val) + acc, 0)


console.log(result);
console.log();
