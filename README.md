# nmbr
[![Build Status](https://secure.travis-ci.org/webschik/nmbr.png?branch=master)](https://travis-ci.org/webschik/nmbr)
[![npm](https://img.shields.io/npm/dm/nmbr.svg)](https://www.npmjs.com/package/nmbr)
[![npm](https://img.shields.io/npm/v/nmbr.svg)](https://www.npmjs.com/package/nmbr)
[![npm](https://img.shields.io/npm/l/nmbr.svg)](https://www.npmjs.com/package/nmbr)
[![Coverage Status](https://coveralls.io/repos/github/webschik/nmbr/badge.svg?branch=master)](https://coveralls.io/github/webschik/nmbr?branch=master)

> Isomorphic JavaScript numbers parser and formatter

## Requirements
* [Object.assign]()

## Installation
```shell
npm install nmbr --save
```

```html
// Standard HTML import
<script src="node_modules/nmbr/lib/index.js"></script>
<script>
  var formatNumber = window.nmbr.formatNumber;
  ...
</script>
```

```js
// JS module
import {formatNumber, parseNumber} from 'nmbr';
```

## API
### Formatter
Converts the number to a string by specified options.

#### formatNumber
This method takes 2 arguments:
* `number` - any JS number
* `options`:
```
{
    fractionSize?: number;
    roundSize?: number;
    minFractionSize?: number;
    separateThousands?: boolean;
    thousandDelimiter?: string;
    fractionDelimiter?: string;
    preset?: string;
}
```

Example:
```js
import {formatNumber} from 'nmbr';

// '2.453,43'
const result = formatNumber(24534.343e-1, {
    fractionSize: 2,
    thousandDelimiter: '.',
    fractionDelimiter: ','
});
```

More cases you may find in [my test cases](./test/unit/formatter.spec.ts)

#### Formatting presets
You may define your own set of rules for formatting:

```js
import {addFormattingPreset} from 'nmbr';

addFormattingPreset('myOwnPreset', {
    fractionSize: 1,
    thousandDelimiter: '.',
    fractionDelimiter: ','
});

// '120.009,1'
const result = formatNumber(120009.123456, {
    preset: 'myOwnPreset'
});
```

### Parser
#### parseNumber
Parses a number from input string:

```js
parseNumber('1,234', {thousandDelimiter: ','}); //  1234
parseNumber('1,234.56', {thousandDelimiter: ','}); // 1234.56
parseNumber('1.234,56', {thousandDelimiter: '.'}); // 1234.56
parseNumber('1.234.567', {thousandDelimiter: '.'}); // 1234567
```

You may omit delimiter options if you parse **only** fractional numbers:

```js
import {parseNumber} from 'nmbr';

parseNumber('.02');      // 0.02
parseNumber('.1');       // 0.1
parseNumber(' 1 . 0');   // 1
parseNumber('-1 . 2');   // -1.2
parseNumber('--1 . 0');  // -1
parseNumber(' 1 , 1');   // 1.1
parseNumber('-1 , 2');   // -1.2
parseNumber('-1,12.78'); // -112.78
parseNumber('-1.13,79'); // -113.79
```

### Shortener
#### shortNumber
Converts long numbers to short ones:

```js
import {shortNumber} from 'nmbr';

shortNumber(5432); // 5.4k
shortNumber(1236903); // 1.2M
shortNumber(1236903, {
    template: "The size is [value]([unit]b)"
}); // The size is 1.2(Mb)
```

This method takes 2 arguments:
* `value` - number or string: `2.13` or `'2.13'` 
* `options`:
```
{
    fractionSize?: number;
    template?: string;
    maxUnit?: NumberShortenerUnitName;
    minUnit?: NumberShortenerUnitName;        
}

// NumberShortenerUnitName = 'Y'|'Z'|'E'|'P'|'T'|'G'|'M'|'k'|'h'|'da'|'d'|'c'|'m'|'µ'|'n'|'p'|'f'|'a'|'z'|'y'
```
