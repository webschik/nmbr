import {NumberShortenerOptions, NumberShortenerUnitName} from './index';

interface Unit {
    name: NumberShortenerUnitName;
    base: number;
}

const allUnits: Unit[] = [
    {
        name: 'Y',
        base: 24
    },
    {
        name: 'Z',
        base: 21
    },
    {
        name: 'E',
        base: 18
    },
    {
        name: 'P',
        base: 15
    },
    {
        name: 'T',
        base: 12
    },
    {
        name: 'G',
        base: 9
    },
    {
        name: 'M',
        base: 6
    },
    {
        name: 'k',
        base: 3
    },
    {
        name: 'h',
        base: 2
    },
    {
        name: 'da',
        base: 1
    },
    {
        name: 'd',
        base: -1
    },
    {
        name: 'c',
        base: -2
    },
    {
        name: 'm',
        base: -3
    },
    {
        name: 'µ',
        base: -6
    },
    {
        name: 'n',
        base: -9
    },
    {
        name: 'p',
        base: -12
    },
    {
        name: 'f',
        base: -15
    },
    {
        name: 'a',
        base: -18
    },
    {
        name: 'z',
        base: -21
    },
    {
        name: 'y',
        base: -24
    }
];
const allUnitIndices: {[key: string]: number} = {};
const allUnitsLastIndex: number = allUnits.length - 1;

allUnits.forEach((unit: Unit, index: number) => allUnitIndices[unit.name] = index);

export function shortNumber (input: number|string, options?: NumberShortenerOptions) {
    const value: number = Number(input);

    if (isNaN(value)) {
        return input;
    }

    const {maxUnit = void 0, minUnit = void 0} = options || {};
    const units: Unit[] = allUnits.slice(allUnitIndices[minUnit] || 0, allUnitIndices[maxUnit] || allUnitsLastIndex);
}