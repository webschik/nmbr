import padLeft from '../../src/pad-left';

describe('padLeft()', () => {
    it('should add leading zeros to the number', () => {
        expect(padLeft(2, 1)).toBe('02');
        expect(padLeft(2, 2)).toBe('002');
        expect(padLeft('45', 1)).toBe('045');
        expect(padLeft('0', 1)).toBe('00');
        expect(padLeft(0, 2)).toBe('000');
        expect(padLeft(undefined, 1)).toBe('0');
    });
});