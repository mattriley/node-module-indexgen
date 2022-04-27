const { test } = require('tap');
const configure = require('../src/configure');

const glob = (pattern, options) => {
    if (pattern === 'modules/**') return ['foo'];
    if (pattern === '*/' && options.cwd === 'foo') return [];
    if (pattern === '*.{js,json}' && options.cwd === 'foo') return [
        '_legalJsNameStartingWithUnderscoreAndLower.js',
        '_LegalJsNameStartingWithUnderscoreAndUpper.js',
        '$legalJsNameStartingWithDollarAndLower.js',
        '$LegalJsNameStartingWithDollarAndUpper.js',
        'legalJsNameStartingWithLower.js',
        'LegalJsNameStartingWithUpper.js',
        'illegal-js-name-starting-with-lower.js',
        'Illegal-js-name-starting-with-upper.js',
        '1-illegal-js-name-starting-with-number-and-lower.js',
        '1-Illegal-js-name-starting-with-number-and-upper.js',
        'JsonFile.json'
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

    const io = { fs, glob };
    const { indexgen } = configure(config, { io });
    indexgen('modules');
};

test('cjs', t => {
    const config = { type: 'cjs' };
    doTest(t, config);
});

test('cjs fullySpecified', t => {
    const config = { type: 'cjs', fullySpecified: true };
    doTest(t, config);
});

test('esm fullySpecified', t => {
    const config = { type: 'esm', fullySpecified: true };
    doTest(t, config);
});
