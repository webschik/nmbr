export default function padRight (str: string|number, offset: number): string {
    let result: string = String(str);

    if (!str && str !== 0) {
        result = '';
    }

    for (let i = 0; i < offset; i++) {
        result += '0';
    }

    return result;
}