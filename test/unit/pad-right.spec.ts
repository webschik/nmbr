import padRight from '../../src/pad-right';

describe('padRight()', () => {
    it('should add trailing zeros to the number', () => {
        expect(padRight(2, 1)).toBe('20');
        expect(padRight(2, 2)).toBe('200');
        expect(padRight('45', 1)).toBe('450');
        expect(padRight('0', 1)).toBe('00');
        expect(padRight(0, 2)).toBe('000');
        expect(padRight(undefined, 1)).toBe('0');
    });
});