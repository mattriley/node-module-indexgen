const test = require('node:test');
const assert = require('node:assert').strict;
const compose = require('../src/compose');

const glob = (pattern, options) => {
    if (pattern === 'modules/**') return ['foo'];
    if (pattern === '*/' && options.cwd === 'foo') return [];
    if (pattern === '*.{cjs,mjs,js,json,jsx}' && options.cwd === 'foo') return [
        '_legalJsNameStartingWithUnderscoreAndLower.js',
        '_LegalJsNameStartingWithUnderscoreAndUpper.js',
        '$legalJsNameStartingWithDollarAndLower.js',
        '$LegalJsNameStartingWithDollarAndUpper.js',
        'legalJsNameStartingWithLower.js',
        'LegalJsNameStartingWithUpper.js',
        'illegal-js-name-starting-with-lower.js',
        'Illegal-js-name-starting-with-upper.js',
        '1-illegal-js-name-with-number',
        '10--illegal-js-name-with-sort-string-10',
        '2--illegal-js-name-with-sort-string-2',
        '1--illegal-js-name-starting-with-lower-with-sort-string-1.js',
        '1--Illegal-js-name-starting-with-upper-with-sort-string-1.js',
        'JsonFile.json',
        'bar,foo',
        'baz.qux.js'
    ];
    return [];
};

const doTest = (config, expected) => {
    const fs = {
        statSync: () => ({ isFile: () => true }),
        promises: {
            access: () => Promise.reject(),
            writeFile: (filename, content) => {
                if (filename === 'modules/index.js') return;
                assert.equal(filename, 'foo/index.js');
                assert.equal(content.trim(), expected.trim());
            }
        }
    };

    const overrides = { io: { fs, glob } };
    const { commands } = compose({ overrides, config });
    commands.indexgen('modules');
};

// --------------------
// Baseline (preserveDots = true default)
// --------------------

test('cjs', () => {
    const expected = `
module.exports = {
    'baz.qux': require('./baz.qux'),
    _legalJsNameStartingWithUnderscoreAndLower: require('./_legalJsNameStartingWithUnderscoreAndLower'),
    _LegalJsNameStartingWithUnderscoreAndUpper: require('./_LegalJsNameStartingWithUnderscoreAndUpper'),
    $legalJsNameStartingWithDollarAndLower: require('./$legalJsNameStartingWithDollarAndLower'),
    $LegalJsNameStartingWithDollarAndUpper: require('./$LegalJsNameStartingWithDollarAndUpper'),
    illegalJsNameStartingWithLowerWithSortString1: require('./1--illegal-js-name-starting-with-lower-with-sort-string-1'),
    IllegalJsNameStartingWithUpperWithSortString1: require('./1--Illegal-js-name-starting-with-upper-with-sort-string-1'),
    '1-illegalJsNameWithNumber': require('./1-illegal-js-name-with-number'),
    illegalJsNameWithSortString2: require('./2--illegal-js-name-with-sort-string-2'),
    illegalJsNameWithSortString10: require('./10--illegal-js-name-with-sort-string-10'),
    fooBar: require('./bar,foo'),
    illegalJsNameStartingWithLower: require('./illegal-js-name-starting-with-lower'),
    IllegalJsNameStartingWithUpper: require('./Illegal-js-name-starting-with-upper'),
    JsonFile: require('./JsonFile.json'),
    legalJsNameStartingWithLower: require('./legalJsNameStartingWithLower'),
    LegalJsNameStartingWithUpper: require('./LegalJsNameStartingWithUpper')
};
`;

    const config = { type: 'cjs', fullySpecified: false, preserveDots: true };
    doTest(config, expected);
});

test('cjs fullySpecified', () => {
    const expected = `
module.exports = {
    'baz.qux': require('./baz.qux.js'),
    _legalJsNameStartingWithUnderscoreAndLower: require('./_legalJsNameStartingWithUnderscoreAndLower.js'),
    _LegalJsNameStartingWithUnderscoreAndUpper: require('./_LegalJsNameStartingWithUnderscoreAndUpper.js'),
    $legalJsNameStartingWithDollarAndLower: require('./$legalJsNameStartingWithDollarAndLower.js'),
    $LegalJsNameStartingWithDollarAndUpper: require('./$LegalJsNameStartingWithDollarAndUpper.js'),
    illegalJsNameStartingWithLowerWithSortString1: require('./1--illegal-js-name-starting-with-lower-with-sort-string-1.js'),
    IllegalJsNameStartingWithUpperWithSortString1: require('./1--Illegal-js-name-starting-with-upper-with-sort-string-1.js'),
    '1-illegalJsNameWithNumber': require('./1-illegal-js-name-with-number'),
    illegalJsNameWithSortString2: require('./2--illegal-js-name-with-sort-string-2'),
    illegalJsNameWithSortString10: require('./10--illegal-js-name-with-sort-string-10'),
    fooBar: require('./bar,foo'),
    illegalJsNameStartingWithLower: require('./illegal-js-name-starting-with-lower.js'),
    IllegalJsNameStartingWithUpper: require('./Illegal-js-name-starting-with-upper.js'),
    JsonFile: require('./JsonFile.json'),
    legalJsNameStartingWithLower: require('./legalJsNameStartingWithLower.js'),
    LegalJsNameStartingWithUpper: require('./LegalJsNameStartingWithUpper.js')
};
`;

    const config = { type: 'cjs', fullySpecified: true, preserveDots: true };
    doTest(config, expected);
});

test('esm', () => {
    const expected = `
import { default as baz_qux } from './baz.qux';
import { default as _legalJsNameStartingWithUnderscoreAndLower } from './_legalJsNameStartingWithUnderscoreAndLower';
import { default as _LegalJsNameStartingWithUnderscoreAndUpper } from './_LegalJsNameStartingWithUnderscoreAndUpper';
import { default as $legalJsNameStartingWithDollarAndLower } from './$legalJsNameStartingWithDollarAndLower';
import { default as $LegalJsNameStartingWithDollarAndUpper } from './$LegalJsNameStartingWithDollarAndUpper';
import { default as illegalJsNameStartingWithLowerWithSortString1 } from './1--illegal-js-name-starting-with-lower-with-sort-string-1';
import { default as IllegalJsNameStartingWithUpperWithSortString1 } from './1--Illegal-js-name-starting-with-upper-with-sort-string-1';
import { default as illegalJsNameWithNumber } from './1-illegal-js-name-with-number';
import { default as illegalJsNameWithSortString2 } from './2--illegal-js-name-with-sort-string-2';
import { default as illegalJsNameWithSortString10 } from './10--illegal-js-name-with-sort-string-10';
import { default as fooBar } from './bar,foo';
import { default as illegalJsNameStartingWithLower } from './illegal-js-name-starting-with-lower';
import { default as IllegalJsNameStartingWithUpper } from './Illegal-js-name-starting-with-upper';
import { default as JsonFile } from './JsonFile.json';
import { default as legalJsNameStartingWithLower } from './legalJsNameStartingWithLower';
import { default as LegalJsNameStartingWithUpper } from './LegalJsNameStartingWithUpper';

export default {
    'baz.qux': baz_qux,
    _legalJsNameStartingWithUnderscoreAndLower,
    _LegalJsNameStartingWithUnderscoreAndUpper,
    $legalJsNameStartingWithDollarAndLower,
    $LegalJsNameStartingWithDollarAndUpper,
    illegalJsNameStartingWithLowerWithSortString1,
    IllegalJsNameStartingWithUpperWithSortString1,
    '1-illegalJsNameWithNumber': illegalJsNameWithNumber,
    illegalJsNameWithSortString2,
    illegalJsNameWithSortString10,
    fooBar,
    illegalJsNameStartingWithLower,
    IllegalJsNameStartingWithUpper,
    JsonFile,
    legalJsNameStartingWithLower,
    LegalJsNameStartingWithUpper
};
`;

    const config = { type: 'esm', fullySpecified: false, preserveDots: true };
    doTest(config, expected);
});

test('esm fullySpecified', () => {
    const expected = `
import { default as baz_qux } from './baz.qux.js';
import { default as _legalJsNameStartingWithUnderscoreAndLower } from './_legalJsNameStartingWithUnderscoreAndLower.js';
import { default as _LegalJsNameStartingWithUnderscoreAndUpper } from './_LegalJsNameStartingWithUnderscoreAndUpper.js';
import { default as $legalJsNameStartingWithDollarAndLower } from './$legalJsNameStartingWithDollarAndLower.js';
import { default as $LegalJsNameStartingWithDollarAndUpper } from './$LegalJsNameStartingWithDollarAndUpper.js';
import { default as illegalJsNameStartingWithLowerWithSortString1 } from './1--illegal-js-name-starting-with-lower-with-sort-string-1.js';
import { default as IllegalJsNameStartingWithUpperWithSortString1 } from './1--Illegal-js-name-starting-with-upper-with-sort-string-1.js';
import { default as illegalJsNameWithNumber } from './1-illegal-js-name-with-number';
import { default as illegalJsNameWithSortString2 } from './2--illegal-js-name-with-sort-string-2';
import { default as illegalJsNameWithSortString10 } from './10--illegal-js-name-with-sort-string-10';
import { default as fooBar } from './bar,foo';
import { default as illegalJsNameStartingWithLower } from './illegal-js-name-starting-with-lower.js';
import { default as IllegalJsNameStartingWithUpper } from './Illegal-js-name-starting-with-upper.js';
import { default as JsonFile } from './JsonFile.json';
import { default as legalJsNameStartingWithLower } from './legalJsNameStartingWithLower.js';
import { default as LegalJsNameStartingWithUpper } from './LegalJsNameStartingWithUpper.js';

export default {
    'baz.qux': baz_qux,
    _legalJsNameStartingWithUnderscoreAndLower,
    _LegalJsNameStartingWithUnderscoreAndUpper,
    $legalJsNameStartingWithDollarAndLower,
    $LegalJsNameStartingWithDollarAndUpper,
    illegalJsNameStartingWithLowerWithSortString1,
    IllegalJsNameStartingWithUpperWithSortString1,
    '1-illegalJsNameWithNumber': illegalJsNameWithNumber,
    illegalJsNameWithSortString2,
    illegalJsNameWithSortString10,
    fooBar,
    illegalJsNameStartingWithLower,
    IllegalJsNameStartingWithUpper,
    JsonFile,
    legalJsNameStartingWithLower,
    LegalJsNameStartingWithUpper
};
`;

    const config = { type: 'esm', fullySpecified: true, preserveDots: true };
    doTest(config, expected);
});

// --------------------
// New behavior: preserveDots = false
// --------------------

test('cjs (preserveDots=false)', () => {
    const expected = `
module.exports = {
    bazQux: require('./baz.qux'),
    _legalJsNameStartingWithUnderscoreAndLower: require('./_legalJsNameStartingWithUnderscoreAndLower'),
    _LegalJsNameStartingWithUnderscoreAndUpper: require('./_LegalJsNameStartingWithUnderscoreAndUpper'),
    $legalJsNameStartingWithDollarAndLower: require('./$legalJsNameStartingWithDollarAndLower'),
    $LegalJsNameStartingWithDollarAndUpper: require('./$LegalJsNameStartingWithDollarAndUpper'),
    illegalJsNameStartingWithLowerWithSortString1: require('./1--illegal-js-name-starting-with-lower-with-sort-string-1'),
    IllegalJsNameStartingWithUpperWithSortString1: require('./1--Illegal-js-name-starting-with-upper-with-sort-string-1'),
    '1-illegalJsNameWithNumber': require('./1-illegal-js-name-with-number'),
    illegalJsNameWithSortString2: require('./2--illegal-js-name-with-sort-string-2'),
    illegalJsNameWithSortString10: require('./10--illegal-js-name-with-sort-string-10'),
    fooBar: require('./bar,foo'),
    illegalJsNameStartingWithLower: require('./illegal-js-name-starting-with-lower'),
    IllegalJsNameStartingWithUpper: require('./Illegal-js-name-starting-with-upper'),
    JsonFile: require('./JsonFile.json'),
    legalJsNameStartingWithLower: require('./legalJsNameStartingWithLower'),
    LegalJsNameStartingWithUpper: require('./LegalJsNameStartingWithUpper')
};
`;

    const config = { type: 'cjs', fullySpecified: false, preserveDots: false, case: 'camel' };
    doTest(config, expected);
});

test('esm (preserveDots=false)', () => {
    const expected = `
import { default as bazQux } from './baz.qux';
import { default as _legalJsNameStartingWithUnderscoreAndLower } from './_legalJsNameStartingWithUnderscoreAndLower';
import { default as _LegalJsNameStartingWithUnderscoreAndUpper } from './_LegalJsNameStartingWithUnderscoreAndUpper';
import { default as $legalJsNameStartingWithDollarAndLower } from './$legalJsNameStartingWithDollarAndLower';
import { default as $LegalJsNameStartingWithDollarAndUpper } from './$LegalJsNameStartingWithDollarAndUpper';
import { default as illegalJsNameStartingWithLowerWithSortString1 } from './1--illegal-js-name-starting-with-lower-with-sort-string-1';
import { default as IllegalJsNameStartingWithUpperWithSortString1 } from './1--Illegal-js-name-starting-with-upper-with-sort-string-1';
import { default as illegalJsNameWithNumber } from './1-illegal-js-name-with-number';
import { default as illegalJsNameWithSortString2 } from './2--illegal-js-name-with-sort-string-2';
import { default as illegalJsNameWithSortString10 } from './10--illegal-js-name-with-sort-string-10';
import { default as fooBar } from './bar,foo';
import { default as illegalJsNameStartingWithLower } from './illegal-js-name-starting-with-lower';
import { default as IllegalJsNameStartingWithUpper } from './Illegal-js-name-starting-with-upper';
import { default as JsonFile } from './JsonFile.json';
import { default as legalJsNameStartingWithLower } from './legalJsNameStartingWithLower';
import { default as LegalJsNameStartingWithUpper } from './LegalJsNameStartingWithUpper';

export default {
    bazQux,
    _legalJsNameStartingWithUnderscoreAndLower,
    _LegalJsNameStartingWithUnderscoreAndUpper,
    $legalJsNameStartingWithDollarAndLower,
    $LegalJsNameStartingWithDollarAndUpper,
    illegalJsNameStartingWithLowerWithSortString1,
    IllegalJsNameStartingWithUpperWithSortString1,
    '1-illegalJsNameWithNumber': illegalJsNameWithNumber,
    illegalJsNameWithSortString2,
    illegalJsNameWithSortString10,
    fooBar,
    illegalJsNameStartingWithLower,
    IllegalJsNameStartingWithUpper,
    JsonFile,
    legalJsNameStartingWithLower,
    LegalJsNameStartingWithUpper
};
`;

    const config = { type: 'esm', fullySpecified: false, preserveDots: false, case: 'camel' };
    doTest(config, expected);
});
