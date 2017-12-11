import {formatNumber, addFormattingPreset} from './../../src/index';
import {NumberFormattingOptions} from '../../src/formatter';

describe('Formatter', () => {
    const thousandDelimiter = '.';
    const fractionDelimiter = ',';

    function getOptions (options?: NumberFormattingOptions) {
        return Object.assign({
            thousandDelimiter,
            fractionDelimiter
        }, options);
    }

    describe('#formatNumber()', () => {
        it('default params', () => {
            let result;

            result = formatNumber(1.543, getOptions());
            expect(result).toEqual(`1${ fractionDelimiter }543`);

            result = formatNumber(2.1, getOptions());
            expect(result).toEqual(`2${ fractionDelimiter }1`);

            result = formatNumber(2, getOptions());
            expect(result).toEqual('2');

            result = formatNumber('1.130', getOptions());
            expect(result).toEqual(`1${ fractionDelimiter }13`);

            result = formatNumber(1.340, getOptions());
            expect(result).toEqual(`1${ fractionDelimiter }34`);

            result = formatNumber(10020, getOptions());
            expect(result).toEqual(`10${ thousandDelimiter }020`);

            result = formatNumber(27e-16, getOptions());
            expect(result).toEqual(`0${ fractionDelimiter }0000000000000027`);

            result = formatNumber(2.7e-16, getOptions());
            expect(result).toEqual(`0${ fractionDelimiter }00000000000000027`);

            result = formatNumber(2.7e+5, getOptions());
            expect(result).toEqual(`270${ thousandDelimiter }000`);

            result = formatNumber(279585e-15, getOptions());
            expect(result).toEqual(`0${ fractionDelimiter }000000000279585`);

            result = formatNumber(null, getOptions());
            expect(result).toEqual('0');

            result = formatNumber(12341234.567, getOptions());
            expect(result).toEqual(`12${ thousandDelimiter }341${ thousandDelimiter }234${ fractionDelimiter }567`);
        });

        it('fractionSize', () => {
            let result;

            result = formatNumber(-0.006, getOptions({fractionSize: 2}));
            expect(result).toEqual('0');

            result = formatNumber(4, getOptions({fractionSize: 2}));
            expect(result).toEqual('4');

            result = formatNumber(24534.343e-1, getOptions({fractionSize: 2}));
            expect(result).toEqual(`2${ thousandDelimiter }453${ fractionDelimiter }43`);

            result = formatNumber(-179213, getOptions({fractionSize: 2}));
            expect(result).toEqual(`-179${ thousandDelimiter }213`);

            result = formatNumber(null, getOptions({fractionSize: 2}));
            expect(result).toEqual('0');

            result = formatNumber(undefined, getOptions({fractionSize: 1}));
            expect(result).toEqual('0');

            result = formatNumber(1.5405, getOptions({fractionSize: 3}));
            expect(result).toEqual(`1${ fractionDelimiter }54`);

            result = formatNumber(8.465450562766819e-6, getOptions({fractionSize: 2}));
            expect(result).toEqual('0');

            result = formatNumber('3.5e-3', getOptions({fractionSize: 3}));
            expect(result).toEqual(`0${ fractionDelimiter }003`);

            result = formatNumber('-3.5e-3', getOptions({fractionSize: 3}));
            expect(result).toEqual(`-0${ fractionDelimiter }003`);

            result = formatNumber('0.5e-3', getOptions({fractionSize: 5}));
            expect(result).toEqual(`0${ fractionDelimiter }0005`);

            result = formatNumber(542358.98, getOptions({fractionSize: 2}));
            expect(result).toEqual(`542${ thousandDelimiter }358${ fractionDelimiter }98`);

            result = formatNumber('356.5e-3', getOptions({fractionSize: 3}));
            expect(result).toEqual(`0${ fractionDelimiter }356`);

            result = formatNumber('3.5e-aaaaa', getOptions({fractionSize: 3}));
            expect(result).toEqual('0');

            result = formatNumber('3.000000026564564e+7', getOptions({fractionSize: 5}));
            expect(result).toEqual(`30${ thousandDelimiter }000${ thousandDelimiter }000${ fractionDelimiter }26564`);

            result = formatNumber(1.0501, getOptions({fractionSize: 3}));
            expect(result).toEqual(`1${ fractionDelimiter }05`);

            result = formatNumber(4.1, getOptions({fractionSize: 2}));
            expect(result).toEqual(`4${ fractionDelimiter }1`);

            result = formatNumber(-139900, getOptions({fractionSize: 0}));
            expect(result).toEqual(`-139${ thousandDelimiter }900`);

            result = formatNumber(4.01, getOptions({fractionSize: 3}));
            expect(result).toEqual(`4${ fractionDelimiter }01`);

            result = formatNumber(4.01, getOptions({fractionSize: 1}));
            expect(result).toEqual('4');

            result = formatNumber(4.01, getOptions({fractionSize: 2}));
            expect(result).toEqual(`4${ fractionDelimiter }01`);

            result = formatNumber(4.1, getOptions({fractionSize: 0}));
            expect(result).toEqual('4');

            result = formatNumber(4, getOptions({fractionSize: 2}));
            expect(result).toEqual('4');

            result = formatNumber(1.549, getOptions({fractionSize: 2}));
            expect(result).toEqual(`1${ fractionDelimiter }54`);

            result = formatNumber(1234.567, getOptions({fractionSize: 1}));
            expect(result).toEqual(`1${ thousandDelimiter }234${ fractionDelimiter }5`);

            result = formatNumber(4.1333, getOptions({fractionSize: 2}));
            expect(result).toEqual(`4${ fractionDelimiter }13`);

            result = formatNumber(4.10322, getOptions({fractionSize: 2}));
            expect(result).toEqual(`4${ fractionDelimiter }1`);

            result = formatNumber(4.1, getOptions({fractionSize: 2}));
            expect(result).toEqual(`4${ fractionDelimiter }1`);

            result = formatNumber(1000.12, getOptions({fractionSize: 4}));
            expect(result).toEqual(`1${ thousandDelimiter }000${ fractionDelimiter }12`);
        });

        it('minFractionSize', () => {
            let result;

            result = formatNumber(-0.006, getOptions({minFractionSize: 2}));
            expect(result).toEqual(`-0${ fractionDelimiter }006`);

            result = formatNumber(-0.006, getOptions({minFractionSize: 4}));
            expect(result).toEqual(`-0${ fractionDelimiter }0060`);
        });

        it('fractionSize, minFractionSize', () => {
            let result;

            result = formatNumber(-0.006, getOptions({fractionSize: 2, minFractionSize: 3}));
            expect(result).toEqual(`-0${ fractionDelimiter }006`);

            result = formatNumber(0.502200001, getOptions({fractionSize: 2, minFractionSize: 2}));
            expect(result).toEqual(`0${ fractionDelimiter }50`);

            result = formatNumber(1.1150, getOptions({fractionSize: 4, minFractionSize: 2}));
            expect(result).toEqual(`1${ fractionDelimiter }115`);

            result = formatNumber(1.1000, getOptions({fractionSize: 4, minFractionSize: 2}));
            expect(result).toEqual(`1${ fractionDelimiter }10`);

            result = formatNumber(-0.006, getOptions({fractionSize: 0, minFractionSize: 0}));
            expect(result).toEqual('0');

            result = formatNumber(4, getOptions({fractionSize: 2, minFractionSize: 2}));
            expect(result).toEqual(`4${ fractionDelimiter }00`);

            result = formatNumber(4, getOptions({fractionSize: 2, minFractionSize: 1}));
            expect(result).toEqual(`4${ fractionDelimiter }0`);

            result = formatNumber(4.1, getOptions({fractionSize: 2, minFractionSize: 0}));
            expect(result).toEqual(`4${ fractionDelimiter }1`);

            result = formatNumber(4.10322, getOptions({fractionSize: 2, minFractionSize: 2}));
            expect(result).toEqual(`4${ fractionDelimiter }10`);

            result = formatNumber(8.45645e+2, getOptions({fractionSize: 2, minFractionSize: 2}));
            expect(result).toEqual(`845${ fractionDelimiter }64`);

            result = formatNumber(8.465450562766819e-6, getOptions({fractionSize: 10, minFractionSize: 2}));
            expect(result).toEqual(`0${ fractionDelimiter }0000084654`);

            result = formatNumber(9e-6, getOptions({fractionSize: 10, minFractionSize: 10}));
            expect(result).toEqual(`0${ fractionDelimiter }0000090000`);

            result = formatNumber(4000e-2, getOptions({fractionSize: 2, minFractionSize: 2}));
            expect(result).toEqual(`40${ fractionDelimiter }00`);
        });

        it('roundSize', () => {
            let result;

            result = formatNumber(4.84, getOptions({roundSize: 0}));
            expect(result).toEqual('5');

            result = formatNumber(4.84, getOptions({roundSize: 2}));
            expect(result).toEqual(`4${ fractionDelimiter }84`);
        });

        it('fractionSize, roundSize', () => {
            let result;

            result = formatNumber(4.125, getOptions({fractionSize: 2, roundSize: 2}));
            expect(result).toEqual(`4${ fractionDelimiter }13`);

            result = formatNumber(4.125, getOptions({fractionSize: 3, roundSize: 2}));
            expect(result).toEqual(`4${ fractionDelimiter }13`);

            result = formatNumber(4.125, getOptions({fractionSize: 3, roundSize: 0}));
            expect(result).toEqual('4');

            result = formatNumber(4.195, getOptions({fractionSize: 2, roundSize: 2}));
            expect(result).toEqual(`4${ fractionDelimiter }2`);
            result = formatNumber(279.585, getOptions({fractionSize: 2, roundSize: 2}));
            expect(result).toEqual(`279${ fractionDelimiter }59`);
            result = formatNumber(279.985, getOptions({fractionSize: 2, roundSize: 1}));
            expect(result).toEqual('280');
            result = formatNumber(279.085, getOptions({fractionSize: 2, roundSize: 1}));
            expect(result).toEqual(`279${ fractionDelimiter }1`);
            result = formatNumber(279585e-3, getOptions({fractionSize: 2, roundSize: 2}));
            expect(result).toEqual(`279${ fractionDelimiter }59`);
            result = formatNumber(279585e-15, getOptions({fractionSize: 15, roundSize: 12}));
            expect(result).toEqual(`0${ fractionDelimiter }00000000028`);
        });

        it('fractionSize, roundSize, minFractionSize', () => {
            let result;

            result = formatNumber(4.125, getOptions({fractionSize: 3, roundSize: 2, minFractionSize: 3}));
            expect(result).toEqual(`4${ fractionDelimiter }130`);

            result = formatNumber(4.125, getOptions({fractionSize: 3, roundSize: 0, minFractionSize: 3}));
            expect(result).toEqual(`4${ fractionDelimiter }000`);

            result = formatNumber(4.195, getOptions({fractionSize: 2, roundSize: 2, minFractionSize: 2}));
            expect(result).toEqual(`4${ fractionDelimiter }20`);

            result = formatNumber(279.985, getOptions({fractionSize: 2, roundSize: 1, minFractionSize: 2}));
            expect(result).toEqual(`280${ fractionDelimiter }00`);

            result = formatNumber(279.085, getOptions({fractionSize: 2, roundSize: 1, minFractionSize: 2}));
            expect(result).toEqual(`279${ fractionDelimiter }10`);

            result = formatNumber(0.58, getOptions({fractionSize: 2, roundSize: 1, minFractionSize: 2}));
            expect(result).toEqual(`0${ fractionDelimiter }60`);

            result = formatNumber(279585e-15, getOptions({fractionSize: 15, roundSize: 12, minFractionSize: 15}));
            expect(result).toEqual(`0${ fractionDelimiter }000000000280000`);
        });
    });

    describe('#addFormattingPreset()', () => {
        it('should format the number without preset', () => {
            const result = formatNumber(4.12555, getOptions());

            expect(result).toEqual(`4${ fractionDelimiter }12555`);
        });

        it('should format the number by preset rules', () => {
            addFormattingPreset('testPreset', {
                fractionSize: 1
            });
            const result = formatNumber(4.12555, getOptions({
                preset: 'testPreset'
            }));

            expect(result).toEqual(`4${ fractionDelimiter }1`);
        });
    });
});