'use strict';

module.exports = ({ test, assert }) => compose => {

    const { renderers } = compose();

    test('emits empty module when files is empty', () => {
        const out = renderers.esm({ files: [] });
        // renderer prints two newlines before export block when there are no imports
        assert.equal(out, `\n\nexport default {\n\n};\n`);
    });

    test('legal identifiers use shorthand; illegal are quoted and bound to safe locals', () => {
        const files = [
            // legal identifiers → shorthand in export object; local binding equals the ident
            { exportName: 'foo', importPath: './foo' },
            { exportName: 'barBaz1', importPath: './barBaz1' },
            { exportName: '$dollar', importPath: './$dollar' },
            { exportName: '_underscore', importPath: './_underscore' },

            // illegal identifiers → create safe local names and quote keys in object
            { exportName: 'kebab-case', importPath: './kebab-case' },
            { exportName: 'has.dot', importPath: './has.dot' },
            { exportName: '123abc', importPath: './n123' },      // leading digits get TRIMMED → "abc"
            { exportName: 'Foo-Bar.Baz', importPath: './Foo-Bar.Baz' },
        ];

        const expected = `
import { default as foo } from './foo';
import { default as barBaz1 } from './barBaz1';
import { default as $dollar } from './$dollar';
import { default as _underscore } from './_underscore';
import { default as kebab_case } from './kebab-case';
import { default as has_dot } from './has.dot';
import { default as abc } from './n123';
import { default as Foo_Bar_Baz } from './Foo-Bar.Baz';

export default {
    foo,
    barBaz1,
    $dollar,
    _underscore,
    'kebab-case': kebab_case,
    'has.dot': has_dot,
    '123abc': abc,
    'Foo-Bar.Baz': Foo_Bar_Baz
};
`.trim() + '\n';

        const out = renderers.esm({ files });
        assert.equal(out, expected);
    });

    test('preserves input order (imports and export object lines)', () => {
        const files = [
            { exportName: 'z', importPath: './z' },
            { exportName: 'a', importPath: './a' },
            { exportName: 'm', importPath: './m' }
        ];

        const expected = `
import { default as z } from './z';
import { default as a } from './a';
import { default as m } from './m';

export default {
    z,
    a,
    m
};
`.trim() + '\n';

        const out = renderers.esm({ files });
        assert.equal(out, expected);
    });

    test('mixed: dotted + kebab + starts-with-digit map to safe local names', () => {
        const files = [
            { exportName: 'a.b', importPath: './a.b' },
            { exportName: 'x-y', importPath: './x-y' },
            { exportName: '9lives', importPath: './nine' },  // leading digit trimmed → "lives"
        ];

        const expected = `
import { default as a_b } from './a.b';
import { default as x_y } from './x-y';
import { default as lives } from './nine';

export default {
    'a.b': a_b,
    'x-y': x_y,
    '9lives': lives
};
`.trim() + '\n';

        const out = renderers.esm({ files });
        assert.equal(out, expected);
    });

};
