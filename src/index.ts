export interface NumberFormattingOptions {
    fractionSize?: number;
    roundSize?: number;
    minFractionSize?: number;
    separateThousands?: boolean;
    thousandDelimiter?: string;
    fractionDelimiter?: string;
    preset?: string;
}

export type NumberShortenerUnitName = 'Y'|'Z'|'E'|'P'|'T'|'G'|'M'|'k'|'h'|'da'|'d'|'c'|'m'|'µ'|'n'|'p'|'f'|'a'|'z'|'y';

export interface NumberShortenerOptions {
    maxUnit?: NumberShortenerUnitName;
    minUnit?: NumberShortenerUnitName;
    fractionSize?: number;
    template?: string;
}

export {formatNumber, addFormattingPreset} from './formatter';
export {shortNumber} from './shortener';
export {parseNumber} from './parser';