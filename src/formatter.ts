import padLeft from './pad-left';
import padRight from './pad-right';
import * as logger from './logger';

export interface NumberFormattingOptions {
    fractionSize?: number;
    roundSize?: number;
    minFractionSize?: number;
    separateThousands?: boolean;
    thousandDelimiter?: string;
    fractionDelimiter?: string;
    preset?: string;
}

const presets: {[key: string]: NumberFormattingOptions;} = {};
const notEmptyNumberPattern: RegExp = /[1-9]/;
const exponentPattern: RegExp = /[eE]/;

/**
 * @param {number} value
 * @returns {string}
 */
function numberToString (value: number): string {
    const decimalPoint: string = '.';
    const absNumber: number = Math.abs(value);
    const numberPartsByExponent: string[] = String(absNumber).split(exponentPattern);
    const exp: number = Number(numberPartsByExponent[1]);
    let numberStr: string = numberPartsByExponent[0];
    let decimalPointIndex: number = numberStr.indexOf(decimalPoint);

    if (!isNaN(exp) && exp !== 0) {
        numberStr = numberStr.replace(decimalPoint, '');
        let numbersLength: number = numberStr.length;

        if (decimalPointIndex < 0) {
            decimalPointIndex = numbersLength;
        }

        if (exp < 0) {
            // "divide"
            decimalPointIndex += exp;

            // pad left
            while (decimalPointIndex < 0) {
                decimalPointIndex++;
                numbersLength++;
                numberStr = padLeft(numberStr, 1);
            }

            if (decimalPointIndex === 0) {
                numberStr = `0${ decimalPoint }${ numberStr }`;
            }
        } else {
            // "multiply"
            decimalPointIndex += exp;

            // pad right
            while (numbersLength < decimalPointIndex) {
                numberStr = padRight(numberStr, 1);
                numbersLength++;
            }

            if (decimalPointIndex < numbersLength) {
                numberStr = numberStr.slice(0, decimalPointIndex) +
                    decimalPoint +
                    numberStr.slice(decimalPointIndex);
            }
        }
    }

    return numberStr;
}

export function addFormattingPreset (name: string, options: NumberFormattingOptions) {
    if (presets[name]) {
        logger.warn(`Formatting preset with a name ${ name } is already exist!`);
    }

    presets[name] = options;
}

/**
 * @param {number|string} input
 * @param {object} [options]
 * @param {string} [options.preset]
 * @param {number} [options.fractionSize] - fractionSize = 2, 1.1256 => 1.12
 * @param {number} [options.roundSize] - roundSize = 2, 1.1256 => 1.13
 * @param {boolean} [options.separateThousands] - 1000000 => 1.000.000
 * @param {boolean} [options.minFractionSize] - minFractionSize = 2, 0 => 0,00
 * @returns {string}
 */
export function formatNumber (input: number|string, options: NumberFormattingOptions): string {
    const preset: string = options && options.preset || '';
    const formattingOptions: NumberFormattingOptions = Object.assign({}, presets[preset], options);
    let value: number = Number(input);

    if (isNaN(value)) {
        value = 0;
    }

    const {roundSize, separateThousands = true, minFractionSize} = formattingOptions;
    const {thousandDelimiter, fractionDelimiter} = formattingOptions;
    let {fractionSize} = formattingOptions;
    let output: string = '';
    const decimalPoint: string = '.';
    const isNegative: boolean = value < 0;
    const numberStr: string = numberToString(value);
    const decimalPointIndex: number = numberStr.indexOf(decimalPoint);
    const hasDecimals: boolean = decimalPointIndex >= 0;
    let fractionPartStr: string = hasDecimals ? numberStr.slice(decimalPointIndex + 1) : '';
    let integerPartStr: string = hasDecimals ? numberStr.slice(0, decimalPointIndex) : numberStr;
    const decimalsCount: number = fractionPartStr.length;

    if (fractionSize < minFractionSize) {
        fractionSize = minFractionSize;
    }

    if (roundSize != null && roundSize >= 0 && decimalsCount > roundSize) {
        let roundedDecimalPart: number = 0;
        const roundMultiplier: number = Math.pow(10, roundSize);

        if (roundSize > 0) {
            const decimalMultiplier: number = Math.pow(10, decimalsCount);
            const decimalPart: number = Number(fractionPartStr) / decimalMultiplier;

            roundedDecimalPart = Math.round(decimalPart * roundMultiplier);
        } else if (Number(fractionPartStr[0]) >= 5) {
            // if roundSize === 0 and the first decimal is 5 or greater we round to integer part
            roundedDecimalPart = roundMultiplier;
        }

        if ((roundedDecimalPart / roundMultiplier) >= 1) {
            integerPartStr = String(Number(integerPartStr) + 1);
            fractionPartStr = '0';
        } else if (roundedDecimalPart === 0) {
            fractionPartStr = '0';
        } else {
            // pad left
            fractionPartStr = String(roundedDecimalPart);
            fractionPartStr = padLeft(fractionPartStr, roundSize - fractionPartStr.length);
        }
    }

    if (fractionSize === 0) {
        fractionPartStr = '';
    } else {
        let size = fractionPartStr.length;

        if (fractionSize != null && fractionSize < size) {
            fractionPartStr = fractionPartStr.slice(0, fractionSize);
            size = fractionSize;
        }

        // remove trailing zeros
        if (minFractionSize == null || minFractionSize < size) {
            const maxTrailingZeros = size - (minFractionSize || 0);

            /**
             * @type {string} - 0{1,2}; 0{1,}
             */
            fractionPartStr = fractionPartStr.replace(new RegExp(`0{1,${ maxTrailingZeros || '' }}$`), '');
        } else if (minFractionSize > size) {
            // add trailing zeros
            fractionPartStr = padRight(fractionPartStr, minFractionSize - size);
        }
    }

    if (separateThousands && thousandDelimiter) {
        const len = integerPartStr.length;

        for (let i = len - 1; i >= 0; i--) {
            const restPartLength = len - i;

            output = integerPartStr[i] + output;

            if (i && restPartLength >= 3 && (restPartLength % 3 === 0)) {
                output = thousandDelimiter + output;
            }
        }
    } else {
        output = integerPartStr;
    }

    if (fractionPartStr) {
        output += fractionDelimiter + fractionPartStr;
    }

    // correction for formatted numbers; -0.00006 -> 0.00
    if (isNegative && (notEmptyNumberPattern.test(integerPartStr) || notEmptyNumberPattern.test(fractionPartStr))) {
        output = `-${ output }`;
    }

    return output;
}