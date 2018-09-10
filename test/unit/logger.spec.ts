import {error, log, warn} from '../../src/logger';

/* tslint:disable no-console */
describe('Logger', () => {
    const originConsole = global.console;
    const originEnv = process.env.NODE_ENV;

    beforeAll(() => {
        Object.assign(global, {
            console: {
                log: jest.fn(),
                warn: jest.fn(),
                error: jest.fn()
            }
        });
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        global.console = originConsole;
        process.env.NODE_ENV = originEnv;
    });

    it('should not call console.log() in production environment', () => {
        process.env.NODE_ENV = 'production';
        log('Prod log');
        expect(console.log).toHaveBeenCalledTimes(0);

        process.env.NODE_ENV = 'development';
        log('Dev log');
        expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('should not call console.warn() in production environment', () => {
        process.env.NODE_ENV = 'production';
        warn('Prod warn');
        expect(console.warn).toHaveBeenCalledTimes(0);

        process.env.NODE_ENV = 'development';
        warn('Dev warn');
        expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it('should fallback console.warn() to console.log()', () => {
        process.env.NODE_ENV = 'development';
        console.warn = undefined;
        warn('Dev warn');
        expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('should not call console.error() in production environment', () => {
        process.env.NODE_ENV = 'production';
        error('Prod error');
        expect(console.error).toHaveBeenCalledTimes(0);

        process.env.NODE_ENV = 'development';
        error('Dev error');
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('should fallback console.error() to console.log()', () => {
        process.env.NODE_ENV = 'development';
        console.error = undefined;
        error('Dev error');
        expect(console.log).toHaveBeenCalledTimes(1);
    });
});
/* tslint:enable */