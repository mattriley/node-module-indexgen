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
        'bar,foo'
    ];
    return [];
};

const doTest = (config, expected) => {
    const fs = {
        lstatSync: () => ({ isDirectory: () => false }),
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

test('cjs', () => {
    const expected = `
module.exports = {
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

    const config = { type: 'cjs', fullySpecified: false };
    doTest(config, expected);
});

test('cjs fullySpecified', () => {
    const expected = `
module.exports = {
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

    const config = { type: 'cjs', fullySpecified: true };
    doTest(config, expected);
});

test('esm', () => {
    const expected = `
import _legalJsNameStartingWithUnderscoreAndLower from './_legalJsNameStartingWithUnderscoreAndLower';
import _LegalJsNameStartingWithUnderscoreAndUpper from './_LegalJsNameStartingWithUnderscoreAndUpper';
import $legalJsNameStartingWithDollarAndLower from './$legalJsNameStartingWithDollarAndLower';
import $LegalJsNameStartingWithDollarAndUpper from './$LegalJsNameStartingWithDollarAndUpper';
import illegalJsNameStartingWithLowerWithSortString1 from './1--illegal-js-name-starting-with-lower-with-sort-string-1';
import IllegalJsNameStartingWithUpperWithSortString1 from './1--Illegal-js-name-starting-with-upper-with-sort-string-1';
import illegalJsNameWithNumber from './1-illegal-js-name-with-number';
import illegalJsNameWithSortString2 from './2--illegal-js-name-with-sort-string-2';
import illegalJsNameWithSortString10 from './10--illegal-js-name-with-sort-string-10';
import fooBar from './bar,foo';
import illegalJsNameStartingWithLower from './illegal-js-name-starting-with-lower';
import IllegalJsNameStartingWithUpper from './Illegal-js-name-starting-with-upper';
import JsonFile from './JsonFile.json';
import legalJsNameStartingWithLower from './legalJsNameStartingWithLower';
import LegalJsNameStartingWithUpper from './LegalJsNameStartingWithUpper';

export default {
    _legalJsNameStartingWithUnderscoreAndLower,
    _LegalJsNameStartingWithUnderscoreAndUpper,
    $legalJsNameStartingWithDollarAndLower,
    $LegalJsNameStartingWithDollarAndUpper,
    illegalJsNameStartingWithLowerWithSortString1,
    IllegalJsNameStartingWithUpperWithSortString1,
    illegalJsNameWithNumber,
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
    const config = { type: 'esm', fullySpecified: false };
    doTest(config, expected);
});

test('esm fullySpecified', () => {
    const expected = `
import _legalJsNameStartingWithUnderscoreAndLower from './_legalJsNameStartingWithUnderscoreAndLower.js';
import _LegalJsNameStartingWithUnderscoreAndUpper from './_LegalJsNameStartingWithUnderscoreAndUpper.js';
import $legalJsNameStartingWithDollarAndLower from './$legalJsNameStartingWithDollarAndLower.js';
import $LegalJsNameStartingWithDollarAndUpper from './$LegalJsNameStartingWithDollarAndUpper.js';
import illegalJsNameStartingWithLowerWithSortString1 from './1--illegal-js-name-starting-with-lower-with-sort-string-1.js';
import IllegalJsNameStartingWithUpperWithSortString1 from './1--Illegal-js-name-starting-with-upper-with-sort-string-1.js';
import illegalJsNameWithNumber from './1-illegal-js-name-with-number';
import illegalJsNameWithSortString2 from './2--illegal-js-name-with-sort-string-2';
import illegalJsNameWithSortString10 from './10--illegal-js-name-with-sort-string-10';
import fooBar from './bar,foo';
import illegalJsNameStartingWithLower from './illegal-js-name-starting-with-lower.js';
import IllegalJsNameStartingWithUpper from './Illegal-js-name-starting-with-upper.js';
import JsonFile from './JsonFile.json';
import legalJsNameStartingWithLower from './legalJsNameStartingWithLower.js';
import LegalJsNameStartingWithUpper from './LegalJsNameStartingWithUpper.js';

export default {
    _legalJsNameStartingWithUnderscoreAndLower,
    _LegalJsNameStartingWithUnderscoreAndUpper,
    $legalJsNameStartingWithDollarAndLower,
    $LegalJsNameStartingWithDollarAndUpper,
    illegalJsNameStartingWithLowerWithSortString1,
    IllegalJsNameStartingWithUpperWithSortString1,
    illegalJsNameWithNumber,
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

    const config = { type: 'esm', fullySpecified: true };
    doTest(config, expected);
});
