const test = require('node:test');
const assert = require('node:assert/strict');

module.exports = ({ test, assert }) => compose => {

    // Import the module under test, providing a mock `util`
    const makeSubject = () => {
        const { renderers } = compose();
        return renderers.cjs;
    };


    test('emits empty object when files is empty', () => {
        const subject = makeSubject();
        const out = subject({ files: [] });
        assert.equal(out, `module.exports = {\n\n};\n`);
    });

    test('emits unquoted keys for legal identifiers and quoted for illegal', () => {
        const subject = makeSubject();

        const files = [
            { exportName: 'foo', importPath: './foo' },                 // legal -> unquoted
            { exportName: 'barBaz1', importPath: './barBaz1' },         // legal -> unquoted
            { exportName: '$dollar', importPath: './$dollar' },         // legal -> unquoted
            { exportName: '_underscore', importPath: './_underscore' }, // legal -> unquoted
            { exportName: 'kebab-case', importPath: './kebab-case' },   // illegal -> quoted
            { exportName: '1startsWithDigit', importPath: './n1' },     // illegal -> quoted
            { exportName: 'has.dot', importPath: './has.dot' }          // illegal -> quoted
        ];

        const expected = `
module.exports = {
    foo: require('./foo'),
    barBaz1: require('./barBaz1'),
    $dollar: require('./$dollar'),
    _underscore: require('./_underscore'),
    'kebab-case': require('./kebab-case'),
    '1startsWithDigit': require('./n1'),
    'has.dot': require('./has.dot')
};
`.trim() + '\n';

        const out = subject({ files });
        assert.equal(out, expected);
    });

    test('preserves input order (no sorting)', () => {
        const subject = makeSubject();

        const files = [
            { exportName: 'z', importPath: './z' },
            { exportName: 'a', importPath: './a' },
            { exportName: 'm', importPath: './m' }
        ];

        const expected = `
module.exports = {
    z: require('./z'),
    a: require('./a'),
    m: require('./m')
};
`.trim() + '\n';

        const out = subject({ files });
        assert.equal(out, expected);
    });

    test('works with a custom util.legalJsName (forces quoting everything)', () => {
        const util = { legalJsName: () => false };
        const subject = makeSubject(util);

        const files = [
            { exportName: 'foo', importPath: './foo' },
            { exportName: '$bar', importPath: './$bar' }
        ];

        const expected = `
module.exports = {
    'foo': require('./foo'),
    '$bar': require('./$bar')
};
`.trim() + '\n';

        const out = subject({ files });
        assert.equal(out, expected);
    });


};
