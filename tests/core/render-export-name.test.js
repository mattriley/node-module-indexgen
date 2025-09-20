module.exports = ({ describe, test, assert }) => compose => {

    const { renderExportName } = compose().core;

    describe('render-export-name', () => {

        test('strips extension only when it is in EXT_SET', () => {
            assert.equal(renderExportName('dir/file--alpha.beta.js'), 'alpha.beta');     // ext stripped
            assert.equal(renderExportName('dir/file--alpha.beta.md'), 'alpha.beta.md');  // ext kept
        });

        test('removes sort prefix and keeps right-hand side of sortSeparator', () => {
            // With sortSeparator="--", keep only the right of the *last* separator => "beta"
            assert.equal(renderExportName('pkg/10--alpha--beta.js'), 'beta');

            // Multiple separators: keep rightmost part "gamma.delta"
            // preserveDots=true; per-dot camel → "gamma.delta"
            assert.equal(renderExportName('pkg/01--02--gamma.delta.ts'), 'gamma.delta');
        });

        test('captures leading non-letters; reattaches by default (keepLeadingSymbols=true)', () => {
            // Default config keepLeadingSymbols=true
            // "%$Foo,Bar" → reverse by "," => "Bar-Foo" → AUTO (starts with upper) => Pascal("barFoo") => "BarFoo" → reattach "%$"
            assert.equal(renderExportName('pkg/--%$Foo,Bar.js'), '%$BarFoo');

            // When keepLeadingSymbols=false, the leading symbols are dropped
            const cfgNoAttach = { keepLeadingSymbols: false };
            assert.equal(renderExportName('pkg/--%$Foo,Bar.js', cfgNoAttach), 'BarFoo');
        });

        test('reverseDelimiter transform: "bar,foo" → "foo-bar" before casing', () => {
            // Same path as above; expectation matches
            assert.equal(renderExportName('pkg/--%$Foo,Bar.js'), '%$BarFoo');
        });

        test('dots policy: preserveDots=true keeps dots and camelCases each dot-segment', () => {
            // "foo.bar-baz" → per-dot camel: "foo" , "bar-baz"→"barBaz" → "foo.barBaz"
            assert.equal(renderExportName('dir/name--foo.bar-baz.ts'), 'foo.barBaz');
        });

        test('dots policy: preserveDots=false replaces dots with "-" before camelCase', () => {
            const cfg = { preserveDots: false };
            // "foo.bar-baz" → dots→"-" → "foo-bar-baz" → camelCase → "fooBarBaz"
            assert.equal(renderExportName('dir/name--foo.bar-baz.ts', cfg), 'fooBarBaz');
        });

        test('AUTO with preserveDots=true: returns as-is if legal dotted identifier; else choose by startsWithUpper', () => {
            assert.equal(renderExportName('dir/a--foo.bar.js'), 'foo.bar');  // legal dotted identifier

            // "Foo-Bar" → reverse not applied here → not legal; starts with upper => Pascal("fooBar") => "FooBar"
            assert.equal(renderExportName('dir/b--Foo-Bar.js'), 'FooBar');
        });

        test('AUTO with preserveDots=false: always choose pascal/camel by startsWithUpper', () => {
            const cfg = { preserveDots: false };
            // "Alpha.Beta" -> "Alpha-Beta" (dots→-) -> starts upper -> Pascal("alphaBeta") => "AlphaBeta"
            assert.equal(renderExportName('z--Alpha.Beta.ts', cfg), 'AlphaBeta');

            // "Zoo" -> starts upper -> Pascal("zoo") => "Zoo"
            assert.equal(renderExportName('z--Zoo.ts', cfg), 'Zoo');
        });

        test('unknown config.case falls back to AUTO', () => {
            const cfg = { case: 'WAT' };
            // "foo-bar" (not legal), startsWithUpper=false → camel "fooBar"
            assert.equal(renderExportName('k--foo-bar.json', cfg), 'fooBar');
        });

        test('leading symbols reattach when keepLeadingSymbols=true', () => {
            const cfg = { keepLeadingSymbols: true };
            // "+-Name,Space" → reverse -> "Space-Name" → Pascal -> "SpaceName" → reattach "+-"
            assert.equal(renderExportName('lib/+-Name,Space.js', cfg), '+-SpaceName');
        });

        test('does not strip extension when not in EXT_SET; basename still used', () => {
            const cfg = { applicableExtensions: ['js'] }; // exclude md
            assert.equal(renderExportName('docs/10--alpha.md', cfg), 'alpha.md');
        });

        test('directory segments do not affect basename calculations', () => {
            assert.equal(renderExportName('pkg.v1/alpha--m.n.ts'), 'm.n');
        });

        test('reverseDelimiter with three segments "c,b,a" -> "a-b-c" then camel in AUTO', () => {
            // "c,b,a" → reverse → "a-b-c"; no dots; not legal -> camel => "aBC"
            assert.equal(renderExportName('x--c,b,a.js'), 'aBC');
        });

        test('preserveDots=false with multi-dot name normalises all dots before casing', () => {
            const cfg = { preserveDots: false, case: 'camel' };
            assert.equal(renderExportName('m--a.b.c.ts', cfg), 'aBC');
        });
    });
};
