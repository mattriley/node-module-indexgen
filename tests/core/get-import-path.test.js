'use strict';

const { describe, beforeEach } = require('node:test');

module.exports = ({ test, assert }) => compose => {

    const buildSubject = ({ config }) => {
        // util is unused by the module, but we pass an empty object to match signature
        const fn = compose({ config }).core.renderImportPath
        // Subject signature: (pathname, config)
        return pathname => fn(pathname, config);
    };

    describe('get-import-path (fullySpecified + EXT_SET + dirs)', () => {
        let baseConfig;

        beforeEach(() => {
            baseConfig = {
                applicableExtensions: ['js', 'ts', 'json'],
                fullySpecified: false,
                filename: 'index.js',   // used when fullySpecified && isDir
            };
        });

        test('known extension (.js) is stripped when not fullySpecified', () => {
            const getPath = buildSubject({ config: baseConfig });
            assert.equal(getPath('src/foo/bar.js'), './src/foo/bar');
            assert.equal(getPath('foo.js'), './foo');
        });

        test('unknown extension (.md) is NOT stripped', () => {
            const getPath = buildSubject({ config: baseConfig });
            assert.equal(getPath('docs/readme.md'), './docs/readme.md');
        });

        test('json files are always fully-specified (extension kept)', () => {
            const getPath = buildSubject({ config: baseConfig });
            assert.equal(getPath('data/config.json'), './data/config.json');
        });

        test('config.fullySpecified=true keeps file extensions and appends filename for dirs', () => {
            const cfg = { ...baseConfig, fullySpecified: true, filename: 'index.js' };
            const getPath = buildSubject({ config: cfg });

            // Files: keep as-is (keep extension)
            assert.equal(getPath('src/util/helpers.ts'), './src/util/helpers.ts');

            // Dirs: append filename to the trailing slash
            assert.equal(getPath('src/components/'), './src/components/index.js');
            assert.equal(getPath('components/'), './components/index.js');
        });

        test('dirs when not fullySpecified: remove trailing slash (no filename appended)', () => {
            const getPath = buildSubject({ config: baseConfig });
            assert.equal(getPath('lib/'), './lib');
            assert.equal(getPath('nested/path/'), './nested/path');
        });

        test('nested paths: known ext strips, unknown ext keeps', () => {
            const getPath = buildSubject({ config: baseConfig });

            assert.equal(getPath('a/b/c/d.ts'), './a/b/c/d');         // known ext
            assert.equal(getPath('a/b/c/d.custom'), './a/b/c/d.custom'); // unknown ext
        });

        test('leading "./" is always prefixed', () => {
            const getPath = buildSubject({ config: baseConfig });

            // identity-ish checks across cases
            assert.equal(getPath('x/y/z.js'), './x/y/z');
            assert.equal(getPath('x/y/z.json'), './x/y/z.json');
            assert.equal(getPath('x/y/'), './x/y');
        });

        test('filename is respected when fullySpecified + dir; different filename', () => {
            const cfg = { ...baseConfig, fullySpecified: true, filename: 'module.cjs' };
            const getPath = buildSubject({ config: cfg });
            assert.equal(getPath('pkg/'), './pkg/module.cjs');
        });

        test('known extension but fullySpecified=true keeps extension', () => {
            const cfg = { ...baseConfig, fullySpecified: true };
            const getPath = buildSubject({ config: cfg });
            assert.equal(getPath('main.js'), './main.js');
        });

        test('unknown extension with fullySpecified=true also kept (files), dirs still get filename', () => {
            const cfg = { ...baseConfig, fullySpecified: true, filename: 'index.js' };
            const getPath = buildSubject({ config: cfg });

            assert.equal(getPath('readme.txt'), './readme.txt');       // file: keep ext
            assert.equal(getPath('pkg/feature/'), './pkg/feature/index.js'); // dir: append filename
        });
    });
};
