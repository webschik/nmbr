import {NumberShortenerOptions, NumberShortenerUnitName} from './index';

interface Unit {
    name: NumberShortenerUnitName;
    base: number;
}

const units: Unit[] = [
    {
        name: 'Y',
        base: 1e+24
    },
    {
        name: 'Z',
        base: 1e+21
    },
    {
        name: 'E',
        base: 1e+18
    },
    {
        name: 'P',
        base: 1e+15
    },
    {
        name: 'T',
        base: 1e+12
    },
    {
        name: 'G',
        base: 1e+9
    },
    {
        name: 'M',
        base: 1e+6
    },
    {
        name: 'k',
        base: 1e+3
    },
    {
        name: 'h',
        base: 1e+2
    },
    {
        name: 'da',
        base: 1e+1
    },
    {
        name: 'd',
        base: 1e-1
    },
    {
        name: 'c',
        base: 1e-2
    },
    {
        name: 'm',
        base: 1e-3
    },
    {
        name: 'µ',
        base: 1e-6
    },
    {
        name: 'n',
        base: 1e-9
    },
    {
        name: 'p',
        base: 1e-12
    },
    {
        name: 'f',
        base: 1e-15
    },
    {
        name: 'a',
        base: 1e-18
    },
    {
        name: 'z',
        base: 1e-21
    },
    {
        name: 'y',
        base: 1e-24
    }
];
const unitsIndices: {[key: string]: number} = {};
const unitsLastIndex: number = units.length - 1;
const unitPattern: RegExp = /\[unit\]/g;
const valuePattern: RegExp = /\[value\]/g;

units.forEach((unit: Unit, index: number) => unitsIndices[unit.name] = index);

export function shortNumber (input: number|string, options?: NumberShortenerOptions): string {
    const value: number = Number(input);

    if (input == null || isNaN(value)) {
        return '';
    }

    const absValue: number = Math.abs(value);
    const {maxUnit = void 0, minUnit = void 0} = options || {};
    const fractionSize: number = (options && options.fractionSize != null) ? options.fractionSize : 1;
    const template: string = options && options.template || '[value][unit]';
    const minUnitIndex: number = unitsIndices[minUnit] || unitsLastIndex;
    const maxUnitIndex: number = unitsIndices[maxUnit] || 0;
    let outputValue: number = value;
    let outputUnit: string = '';

    for (let i = maxUnitIndex; i <= minUnitIndex; i++) {
        const {base, name} = units[i];
        const nextUnit: Unit = i === minUnitIndex ? undefined : units[i + 1];

        if (
            (absValue >= base) ||
            (nextUnit && (base / nextUnit.base >= 100) && (absValue / base >= 0.1))
        ) {
            if (absValue === base) {
                outputValue = 1;
            } else {
                const multiplier: number = 10 ** fractionSize;

                outputValue = Math.round(value / base * multiplier) / multiplier;
            }

            outputUnit = name;
            break;
        }
    }

    return template.replace(unitPattern, outputUnit).replace(valuePattern, String(outputValue));
}