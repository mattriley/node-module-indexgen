const test = require('tape');
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

const doTest = (t, config, expected) => {
    t.plan(2);

    const fs = {
        lstatSync: () => ({ isDirectory: () => false }),
        promises: {
            access: () => Promise.reject(),
            writeFile: (filename, content) => {
                if (filename === 'modules/index.js') return;
                console.log(content);
                t.equal(filename, 'foo/index.js');
                t.equal(content, expected);
            }
        }
    };

    const io = { fs, glob };
    const { indexgen } = configure(config, { io });
    indexgen('modules');
};

test('cjs', t => {
    const config = { type: 'cjs' };
    const expected = 'module.exports = {\n    $LegalJsNameStartingWithDollarAndUpper: require(\'./$LegalJsNameStartingWithDollarAndUpper\'),\n    $legalJsNameStartingWithDollarAndLower: require(\'./$legalJsNameStartingWithDollarAndLower\'),\n    IllegalJsNameStartingWithNumberAndLower: require(\'./1-illegal-js-name-starting-with-number-and-lower\'),\n    IllegalJsNameStartingWithNumberAndUpper: require(\'./1-Illegal-js-name-starting-with-number-and-upper\'),\n    IllegalJsNameStartingWithUpper: require(\'./Illegal-js-name-starting-with-upper\'),\n    JsonFile: require(\'./JsonFile.json\'),\n    LegalJsNameStartingWithUpper: require(\'./LegalJsNameStartingWithUpper\'),\n    _LegalJsNameStartingWithUnderscoreAndUpper: require(\'./_LegalJsNameStartingWithUnderscoreAndUpper\'),\n    _legalJsNameStartingWithUnderscoreAndLower: require(\'./_legalJsNameStartingWithUnderscoreAndLower\'),\n    illegalJsNameStartingWithLower: require(\'./illegal-js-name-starting-with-lower\'),\n    legalJsNameStartingWithLower: require(\'./legalJsNameStartingWithLower\')\n};\n';
    doTest(t, config, expected);
});

test('esm', t => {
    const config = { type: 'esm' };
    const expected = 'import $LegalJsNameStartingWithDollarAndUpper from \'./$LegalJsNameStartingWithDollarAndUpper\';\nimport $legalJsNameStartingWithDollarAndLower from \'./$legalJsNameStartingWithDollarAndLower\';\nimport IllegalJsNameStartingWithNumberAndLower from \'./1-illegal-js-name-starting-with-number-and-lower\';\nimport IllegalJsNameStartingWithNumberAndUpper from \'./1-Illegal-js-name-starting-with-number-and-upper\';\nimport IllegalJsNameStartingWithUpper from \'./Illegal-js-name-starting-with-upper\';\nimport JsonFile from \'./JsonFile.json\';\nimport LegalJsNameStartingWithUpper from \'./LegalJsNameStartingWithUpper\';\nimport _LegalJsNameStartingWithUnderscoreAndUpper from \'./_LegalJsNameStartingWithUnderscoreAndUpper\';\nimport _legalJsNameStartingWithUnderscoreAndLower from \'./_legalJsNameStartingWithUnderscoreAndLower\';\nimport illegalJsNameStartingWithLower from \'./illegal-js-name-starting-with-lower\';\nimport legalJsNameStartingWithLower from \'./legalJsNameStartingWithLower\';\n\nexport default {\n    $LegalJsNameStartingWithDollarAndUpper,\n    $legalJsNameStartingWithDollarAndLower,\n    IllegalJsNameStartingWithNumberAndLower,\n    IllegalJsNameStartingWithNumberAndUpper,\n    IllegalJsNameStartingWithUpper,\n    JsonFile,\n    LegalJsNameStartingWithUpper,\n    _LegalJsNameStartingWithUnderscoreAndUpper,\n    _legalJsNameStartingWithUnderscoreAndLower,\n    illegalJsNameStartingWithLower,\n    legalJsNameStartingWithLower\n};\n';
    doTest(t, config, expected);
});
