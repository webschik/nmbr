import {parseNumber} from '../../src/index';

describe('Parser', () => {
    describe('#parseNumber()', () => {
        it('should parse a number with custom delimiter options', () => {
            expect(parseNumber('1,234', {thousandDelimiter: ','})).toBe(1234);
            expect(parseNumber('1,234.56', {thousandDelimiter: ','})).toBe(1234.56);
            expect(parseNumber('1.234,56', {thousandDelimiter: '.'})).toBe(1234.56);
            expect(parseNumber('1.234.567', {thousandDelimiter: '.'})).toBe(1234567);
        });

        it('should parse a number with default options', () => {
            expect(parseNumber('0')).toBe(0);
            expect(parseNumber(undefined)).toBe(0);
            expect(parseNumber(null)).toBe(0);
            expect(parseNumber('')).toBe(0);
            expect(parseNumber('.02')).toBe(0.02);
            expect(parseNumber('.1')).toBe(0.1);
            expect(parseNumber(' 1 . 0')).toBe(1);
            expect(parseNumber('-1 . 2')).toBe(-1.2);
            expect(parseNumber('--1 . 0')).toBe(-1);
            expect(parseNumber(' 1 , 1')).toBe(1.1);
            expect(parseNumber('-1 , 2')).toBe(-1.2);
            expect(parseNumber('-1,12.78')).toBe(-112.78);
            expect(parseNumber('-1.13,79')).toBe(-113.79);
        });
    });
});