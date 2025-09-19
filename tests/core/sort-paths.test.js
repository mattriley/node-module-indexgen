const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const compose = require('../../src/compose');

const makeSorter = ({ config }) => {
    const { core } = compose({ config });
    return core.sortPaths
}

describe('sort-by-dots', () => {
    let config;

    beforeEach(() => {
        config = {
            // extensions whose dot should be ignored for dot counting
            applicableExtensions: ['js', 'ts', 'json'],
            // choose something distinctive for tests
            sortSeparator: '__'
        };
    });

    test('counts dots ONLY after sortSeparator and strips applicable extension', () => {
        const sorter = makeSorter({ config });

        // After separator: 'x.y.z' -> 2 dots
        // After separator: 'x.y'   -> 1 dot
        // After separator: 'x'     -> 0 dots
        const input = [
            'pkg/a__x.js',
            'pkg/a__x.y.js',
            'pkg/a__x.y.z.js'
        ];

        const out = sorter(input);

        assert.equal(out, input, 'should sort in place and return same array reference');
        assert.deepEqual(out, [
            'pkg/a__x.y.z.js', // 2 dots
            'pkg/a__x.y.js',   // 1 dot
            'pkg/a__x.js'      // 0 dots
        ]);
    });

    test('does NOT strip extension when not in applicableExtensions', () => {
        const sorter = makeSorter({ config });

        // .md is NOT in applicableExtensions, so base keeps extension
        // After separator strings: 'a.b.md' -> 2 dots, 'a.md' -> 1 dot
        const input = [
            'docs/topic__a.md',
            'docs/topic__a.b.md'
        ];

        const out = sorter(input);

        assert.deepEqual(out, [
            'docs/topic__a.b.md',
            'docs/topic__a.md'
        ]);
    });

    test('when no sortSeparator exists, counts dots on the (possibly extension-stripped) base', () => {
        const sorter = makeSorter({ config: { ...config, sortSeparator: '::' } });

        // No '::' present; extension is applicable and stripped
        // Bases: 'foo.bar.baz' -> 2 dots, 'foo.bar' -> 1 dot
        const input = [
            'foo.bar.js',
            'foo.bar.baz.js'
        ];

        const out = sorter(input);

        assert.deepEqual(out, [
            'foo.bar.baz.js',
            'foo.bar.js'
        ]);
    });

    test('tie-breaker: numeric collator on FULL PATH (same dot count)', () => {
        const sorter = makeSorter({ config });

        // After separator, both have 1 dot ('file.2' vs 'file.10')
        // With numeric collator, 2 < 10
        const input = [
            'dir/file__file.10.js',
            'dir/file__file.2.js'
        ];

        const out = sorter(input);

        assert.deepEqual(out, [
            'dir/file__file.2.js',
            'dir/file__file.10.js'
        ]);
    });

    test('tie-breaker uses FULL PATH including directories', () => {
        const sorter = makeSorter({ config });

        // Same dot count for both: after separator is 'v1.0' (1 dot)
        // Collator compares 'a/...' vs 'b/...'
        const input = [
            'b/pkg__v1.0.js',
            'a/pkg__v1.0.js'
        ];

        const out = sorter(input);

        assert.deepEqual(out, [
            'a/pkg__v1.0.js',
            'b/pkg__v1.0.js'
        ]);
    });

    test('handles mixed extensions with stripping only for applicable ones', () => {
        const sorter = makeSorter({ config });

        // After separator:
        //  - js strips -> 'a.b.c' -> 2 dots
        //  - md keeps  -> 'a.b.md' -> 2 dots (still equal)
        // Tie-breaker on full path -> 'docs/...' < 'src/...'
        const input = [
            'src/x__a.b.c.js',
            'docs/x__a.b.md'
        ];

        const out = sorter(input);

        assert.deepEqual(out, [
            'docs/x__a.b.md',
            'src/x__a.b.c.js'
        ]);
    });

    test('empty input returns empty array (identity)', () => {
        const sorter = makeSorter({ config });
        const input = [];
        const out = sorter(input);
        assert.equal(out, input);
        assert.deepEqual(out, []);
    });

    test('multi-level paths still count ONLY after separator', () => {
        const sorter = makeSorter({ config });

        // Dots in directory segments BEFORE separator must be ignored for counting.
        // After separator: 'm.n.o' -> 2 dots; 'm.n' -> 1 dot
        const input = [
            'pkg.v1/alpha__m.n.ts',
            'pkg.v1/beta__m.n.o.ts'
        ];

        const out = sorter(input);

        assert.deepEqual(out, [
            'pkg.v1/beta__m.n.o.ts',
            'pkg.v1/alpha__m.n.ts'
        ]);
    });

    test('stress: identical dot counts & identical basenames -> full path lexical order (numeric aware)', () => {
        const sorter = makeSorter({ config });

        // All after separator: 'x.y' -> 1 dot
        const input = [
            'z/entry__x.y.js',
            'y/entry__x.y.js',
            'x/entry__x.y.js',
            'x/entry__x.y10.js', // still 1 dot after separator; numeric aware means 'y' < 'y10'
            'x/entry__x.y2.js'
        ];

        const out = sorter(input);

        assert.deepEqual(out, [
            'x/entry__x.y.js',
            'x/entry__x.y2.js',
            'x/entry__x.y10.js',
            'y/entry__x.y.js',
            'z/entry__x.y.js'
        ]);
    });
});
