const isConsoleAvailable: boolean = typeof console !== 'undefined';

export function log (message?: any, ...optionalParams: any[]) {
    if (!isConsoleAvailable) {
        return;
    }

    return console.log(message, ...optionalParams);
}

export function error (message?: any, ...optionalParams: any[]) {
    if (!isConsoleAvailable) {
        return;
    }

    if (!console.error) {
        return this.log(message, ...optionalParams);
    }

    return console.error(message, ...optionalParams);
}

export function warn (message?: any, ...optionalParams: any[]) {
    if (!isConsoleAvailable) {
        return;
    }

    if (!console.warn) {
        return this.log(message, ...optionalParams);
    }

    return console.warn(message, ...optionalParams);
}