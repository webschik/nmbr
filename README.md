# nmbr
[![Build Status](https://secure.travis-ci.org/webschik/nmbr.png?branch=master)](https://travis-ci.org/webschik/nmbr)
[![npm](https://img.shields.io/npm/dm/nmbr.svg)](https://www.npmjs.com/package/nmbr)
[![npm](https://img.shields.io/npm/v/nmbr.svg)](https://www.npmjs.com/package/nmbr)
[![npm](https://img.shields.io/npm/l/nmbr.svg)](https://www.npmjs.com/package/nmbr)

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

More cases you may find in [./test/unit/formatter.spec.js](test/unit/formatter.spec.js)

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


```