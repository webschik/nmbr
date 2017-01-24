# nmbr
[![Build Status](https://secure.travis-ci.org/webschik/nmbr.png?branch=master)](https://travis-ci.org/webschik/nmbr)
[![npm](https://img.shields.io/npm/dm/nmbr.svg)](https://www.npmjs.com/package/nmbr)
[![npm](https://img.shields.io/npm/l/nmbr.svg)](https://www.npmjs.com/package/nmbr)

> Isomorphic JavaScript numbers parser and formatter

## Requirements
* [Object.assign]()

## Installation
```shell
npm install nmbr --save
```

```js
// Standard HTML import
<script src="node_modules/nmbr/lib/index.js"></script>
<script>
  var formatNumber = window.nmbr.formatNumber;
  ...
</script>

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
```js
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
}));
```

More cases you may find in [./test/unit/formatter.spec.js](test/unit/formatter.spec.js)

#### Formatting presets
Formatting Preset is a predefined set op formatting options the gives you
more easier access to formatting.

**Default presets:**
```js
{
    amount: {
        fractionSize: 2,
        minFractionSize: 2,
        separateThousands: true
    },
    percent: {
        fractionSize: 2,
        minFractionSize: 2,
        separateThousands: true
    },
    price: {
        fractionSize: 4,
        minFractionSize: 2,
        separateThousands: true
    },
    orderInputPrice: {
        fractionSize: 6,
        minFractionSize: 0,
        separateThousands: true
    }
}

...

import {formatNumber} from 'nmbr';

// '120.009,1234'
const result = formatNumber(120009.123456, {
    preset: 'price',
    thousandDelimiter: '.',
    fractionDelimiter: ','
}));
```

You **may define** your own presets:
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
}));
```

### Parser
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
