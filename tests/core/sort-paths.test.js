module.exports = ({ describe, test, assert }) => compose => {

    const { sortPaths } = compose().core;

    describe('sort-paths', () => {

        test('counts dots ONLY after sortSeparator and strips applicable extension', () => {

            // After separator: 'x.y.z' -> 2 dots
            // After separator: 'x.y'   -> 1 dot
            // After separator: 'x'     -> 0 dots
            const input = [
                'pkg/a--x.js',
                'pkg/a--x.y.js',
                'pkg/a--x.y.z.js'
            ];

            const out = sortPaths(input);

            assert.equal(out, input, 'should sort in place and return same array reference');
            assert.deepEqual(out, [
                'pkg/a--x.y.z.js', // 2 dots
                'pkg/a--x.y.js',   // 1 dot
                'pkg/a--x.js'      // 0 dots
            ]);
        });

        test('does NOT strip extension when not in applicableExtensions', () => {

            // .md is NOT in applicableExtensions, so base keeps extension
            // After separator strings: 'a.b.md' -> 2 dots, 'a.md' -> 1 dot
            const input = [
                'docs/topic--a.md',
                'docs/topic--a.b.md'
            ];

            const out = sortPaths(input);

            assert.deepEqual(out, [
                'docs/topic--a.b.md',
                'docs/topic--a.md'
            ]);
        });

        test('when no sortSeparator exists, counts dots on the (possibly extension-stripped) base', () => {
            const config = { sortSeparator: '::' };

            const { sortPaths } = compose({ config }).core;

            // No '::' present; extension is applicable and stripped
            // Bases: 'foo.bar.baz' -> 2 dots, 'foo.bar' -> 1 dot
            const input = [
                'foo.bar.js',
                'foo.bar.baz.js'
            ];

            const out = sortPaths(input);

            assert.deepEqual(out, [
                'foo.bar.baz.js',
                'foo.bar.js'
            ]);
        });

        test('tie-breaker: numeric collator on FULL PATH (same dot count)', () => {

            // After separator, both have 1 dot ('file.2' vs 'file.10')
            // With numeric collator, 2 < 10
            const input = [
                'dir/file--file.10.js',
                'dir/file--file.2.js'
            ];

            const out = sortPaths(input);

            assert.deepEqual(out, [
                'dir/file--file.2.js',
                'dir/file--file.10.js'
            ]);
        });

        test('tie-breaker uses FULL PATH including directories', () => {

            // Same dot count for both: after separator is 'v1.0' (1 dot)
            // Collator compares 'a/...' vs 'b/...'
            const input = [
                'b/pkg--v1.0.js',
                'a/pkg--v1.0.js'
            ];

            const out = sortPaths(input);

            assert.deepEqual(out, [
                'a/pkg--v1.0.js',
                'b/pkg--v1.0.js'
            ]);
        });

        test('handles mixed extensions with stripping only for applicable ones', () => {

            // After separator:
            //  - js strips -> 'a.b.c' -> 2 dots
            //  - md keeps  -> 'a.b.md' -> 2 dots (still equal)
            // Tie-breaker on full path -> 'docs/...' < 'src/...'
            const input = [
                'src/x--a.b.c.js',
                'docs/x--a.b.md'
            ];

            const out = sortPaths(input);

            assert.deepEqual(out, [
                'docs/x--a.b.md',
                'src/x--a.b.c.js'
            ]);
        });

        test('empty input returns empty array (identity)', () => {
            const input = [];
            const out = sortPaths(input);
            assert.equal(out, input);
            assert.deepEqual(out, []);
        });

        test('multi-level paths still count ONLY after separator', () => {

            // Dots in directory segments BEFORE separator must be ignored for counting.
            // After separator: 'm.n.o' -> 2 dots; 'm.n' -> 1 dot
            const input = [
                'pkg.v1/alpha--m.n.ts',
                'pkg.v1/beta--m.n.o.ts'
            ];

            const out = sortPaths(input);

            assert.deepEqual(out, [
                'pkg.v1/beta--m.n.o.ts',
                'pkg.v1/alpha--m.n.ts'
            ]);
        });

        test('stress: identical dot counts & identical basenames -> full path lexical order (numeric aware)', () => {

            // All after separator: 'x.y' -> 1 dot
            const input = [
                'z/entry--x.y.js',
                'y/entry--x.y.js',
                'x/entry--x.y.js',
                'x/entry--x.y10.js', // still 1 dot after separator; numeric aware means 'y' < 'y10'
                'x/entry--x.y2.js'
            ];

            const out = sortPaths(input);

            assert.deepEqual(out, [
                'x/entry--x.y.js',
                'x/entry--x.y2.js',
                'x/entry--x.y10.js',
                'y/entry--x.y.js',
                'z/entry--x.y.js'
            ]);
        });
    });

};
