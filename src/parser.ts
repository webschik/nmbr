const minusSignCode: number = '-'.charCodeAt(0);
const zeroNumberCode: number = '0'.charCodeAt(0);
const nineNumberCode: number = '9'.charCodeAt(0);
const commaCode: number = ','.charCodeAt(0);
const pointCode: number = '.'.charCodeAt(0);

export function parseNumber (input: string): number {
    let stack: number[] = [];
    let isInteger: boolean = true;
    let i: number = input.length;
    let isNegative: boolean = false;

    while (i--) {
        const symbolCode: number = input.charCodeAt(i);

        if (symbolCode >= zeroNumberCode && symbolCode <= nineNumberCode) {
            isNegative = false;
            stack.unshift(symbolCode);
        } if (symbolCode === minusSignCode) {
            isNegative = true;
        } else if (isInteger && (symbolCode === commaCode || symbolCode === pointCode)) {
            isInteger = false;

            // use '.' as decimals separator
            stack.unshift(pointCode);
        }
    }

    if (isNegative) {
        stack.unshift(minusSignCode);
    }

    const str: string = String.fromCharCode.apply(String, stack);

    if (isInteger) {
        return parseInt(str, 10);
    }

    return parseFloat(str);
}