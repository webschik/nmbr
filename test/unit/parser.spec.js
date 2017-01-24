import {parseNumber} from './../../src/index';

describe('Parser', () => {
    describe('#parseNumber()', () => {
        it('should parse the number', () => {
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