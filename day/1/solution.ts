export default function dayOne(input: string) {
    const wordDigit = /([0-9])|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|(\n)/g;
    let total = 0;
    let lastDigit = 0;

    let out;
    while ((out = wordDigit.exec(input)) !== null) {
        const match = out[0];

        if (match === '\n') {
            total += lastDigit;
            lastDigit = 0;
            continue;
        }

        const digit = isNaN(match) ? out.slice(1).indexOf(match) : +match;

        if (match.length > 1) wordDigit.lastIndex -= match.length - 1;

        if (!lastDigit) total += digit * 10;
        lastDigit = digit;
    }

    return total;
}
