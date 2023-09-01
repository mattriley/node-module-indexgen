// NOTE: To regenerate snapshop: t test --snapshot

const tap = require('tap');
const compose = require('../src/compose');
const { test } = tap;

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

const doTest = (t, config) => {
    t.plan(2);

    const fs = {
        lstatSync: () => ({ isDirectory: () => false }),
        promises: {
            access: () => Promise.reject(),
            writeFile: (filename, content) => {
                if (filename === 'modules/index.js') return;
                t.equal(filename, 'foo/index.js');
                t.matchSnapshot(content, 'output');
            }
        }
    };

    const overrides = { io: { fs, glob } };
    const { commands } = compose({ overrides, config });
    commands.indexgen('modules');
};

test('cjs', t => {
    const config = { type: 'cjs', fullySpecified: false };
    doTest(t, config);
});

test('cjs fullySpecified', t => {
    const config = { type: 'cjs', fullySpecified: true };
    doTest(t, config);
});

test('esm', t => {
    const config = { type: 'esm', fullySpecified: false };
    doTest(t, config);
});

test('esm fullySpecified', t => {
    const config = { type: 'esm', fullySpecified: true };
    doTest(t, config);
});
