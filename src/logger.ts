declare const process: any;

export type LoggerHandler = (message?: any, ...optionalParams: any[]) => void;

export const log: LoggerHandler = function log () {
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    return console.log.apply(console, arguments);
};

export const error: LoggerHandler = function error () {
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    if (!console.error) {
        return console.log.apply(console, arguments);
    }

    return console.error.apply(console, arguments);
};

export const warn: LoggerHandler = function warn () {
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    if (!console.warn) {
        return console.log.apply(console, arguments);
    }

    return console.warn.apply(console, arguments);
};