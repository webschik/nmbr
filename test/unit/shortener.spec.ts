import {shortNumber} from '../../src';

describe('Shortener', () => {
    describe('shortNumber()', () => {
        it('should not process an invalid input', () => {
            expect(shortNumber(undefined)).toBe('');
            expect(shortNumber(null)).toBe('');
            expect(shortNumber('invalid number')).toBe('');
        });

        it('should convert long number to the short ones with a unit symbol', () => {
            expect(shortNumber(1e+25)).toBe('10Y');
            expect(shortNumber(2.25e+23)).toBe('0.2Y');
            expect(shortNumber(2.25e+22)).toBe('22.5Z');
            expect(shortNumber(2e+18)).toBe('2E');
            expect(shortNumber(1e+15)).toBe('1P');
            expect(shortNumber(1e+12)).toBe('1T');
            expect(shortNumber(1e+9)).toBe('1G');
            expect(shortNumber(100e+6)).toBe('0.1G');
            expect(shortNumber(1e+6)).toBe('1M');
            expect(shortNumber(524288)).toBe('0.5M');
            expect(shortNumber(-524288)).toBe('-0.5M');
            expect(shortNumber(3000)).toBe('3k');
            expect(shortNumber(300)).toBe('3h');
            expect(shortNumber(30)).toBe('3da');
            expect(shortNumber(0.3)).toBe('3d');
            expect(shortNumber(0.03)).toBe('3c');
            expect(shortNumber(0.003)).toBe('3m');
            expect(shortNumber(3e-6)).toBe('3µ');
            expect(shortNumber(3e-9)).toBe('3n');
            expect(shortNumber(3e-12)).toBe('3p');
            expect(shortNumber(3e-15)).toBe('3f');
            expect(shortNumber(3e-18)).toBe('3a');
            expect(shortNumber(3e-21)).toBe('3z');
            expect(shortNumber(1e-24)).toBe('1y');
        });

        it('should use user\'s config for formatting', () => {
            expect(shortNumber(524288, {
                maxUnit: 'k'
            })).toBe('524.3k');
            expect(shortNumber(100, {
                minUnit: 'k'
            })).toBe('100');
            expect(shortNumber(524288, {
                template: '[value]([unit]b)'
            })).toBe('0.5(Mb)');
            expect(shortNumber(2.2512e+21, {
                fractionSize: 2
            })).toBe('2.25Z');
        });
    });
});