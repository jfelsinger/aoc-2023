export default function dayOne(input: string) {
    const wordDigit = /(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|([0-9])|(\n)/g;
    let total = 0;
    let lastDigit = 0;

    let out;
    while ((out = wordDigit.exec(input)) !== null) {
        const match = out[0];

        if (out[11]) {
            total += lastDigit;
            lastDigit = 0;
            continue;
        }

        const digit = match[1] ? out.indexOf(match, 1) : +match;
        if (match[1]) wordDigit.lastIndex -= 1;

        if (!lastDigit) total += digit * 10;
        lastDigit = digit;
    }

    return total;
}
