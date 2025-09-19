const { describe } = require('node:test');

module.exports = ({ test, assert }) => compose => {

    const { renderImportPath } = compose().core;

    describe('render-import-path', () => {

        test('known extension (.js) is stripped when not fullySpecified', () => {
            assert.equal(renderImportPath('src/foo/bar.js'), './src/foo/bar');
            assert.equal(renderImportPath('foo.js'), './foo');
        });

        test('unknown extension (.md) is NOT stripped', () => {
            assert.equal(renderImportPath('docs/readme.md'), './docs/readme.md');
        });

        test('json files are always fully-specified (extension kept)', () => {
            assert.equal(renderImportPath('data/config.json'), './data/config.json');
        });

        test('config.fullySpecified=true keeps file extensions and appends filename for dirs', () => {
            const cfg = { fullySpecified: true, filename: 'index.js' };

            // Files: keep as-is (keep extension)
            assert.equal(renderImportPath('src/util/helpers.ts', cfg), './src/util/helpers.ts');

            // Dirs: append filename to the trailing slash
            assert.equal(renderImportPath('src/components/', cfg), './src/components/index.js');
            assert.equal(renderImportPath('components/', cfg), './components/index.js');
        });

        test('dirs when not fullySpecified: remove trailing slash (no filename appended)', () => {
            assert.equal(renderImportPath('lib/'), './lib');
            assert.equal(renderImportPath('nested/path/'), './nested/path');
        });

        test('nested paths: known ext strips, unknown ext keeps', () => {
            assert.equal(renderImportPath('a/b/c/d.ts'), './a/b/c/d');         // known ext
            assert.equal(renderImportPath('a/b/c/d.custom'), './a/b/c/d.custom'); // unknown ext
        });

        test('leading "./" is always prefixed', () => {
            // identity-ish checks across cases
            assert.equal(renderImportPath('x/y/z.js'), './x/y/z');
            assert.equal(renderImportPath('x/y/z.json'), './x/y/z.json');
            assert.equal(renderImportPath('x/y/'), './x/y');
        });

        test('filename is respected when fullySpecified + dir; different filename', () => {
            const cfg = { fullySpecified: true, filename: 'module.cjs' };
            assert.equal(renderImportPath('pkg/', cfg), './pkg/module.cjs');
        });

        test('known extension but fullySpecified=true keeps extension', () => {
            const cfg = { fullySpecified: true };
            assert.equal(renderImportPath('main.js', cfg), './main.js');
        });

        test('unknown extension with fullySpecified=true also kept (files), dirs still get filename', () => {
            const cfg = { fullySpecified: true, filename: 'index.js' };
            assert.equal(renderImportPath('readme.txt', cfg), './readme.txt');       // file: keep ext
            assert.equal(renderImportPath('pkg/feature/', cfg), './pkg/feature/index.js'); // dir: append filename
        });
    });
};
