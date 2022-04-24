const test = require('tape');
const compose = require('../src/compose');
const defaultConfig = require('../src/default-config.json');

test('generates index files', t => {
    t.plan(2);

    const glob = (pattern, options) => {
        if (pattern === 'modules/**') return ['foo'];
        if (pattern === '*/' && options.cwd === 'foo') return [];
        if (pattern === '*.{js,json}' && options.cwd === 'foo') return ['bar.js', 'data.json', 'index.js'];
        return [];
    };

    const fs = {
        lstatSync: () => ({ isDirectory: () => false }),
        promises: {
            access: () => Promise.reject(),
            writeFile: (filename, content) => {
                if (filename === 'modules/index.js') return;
                t.equal(filename, 'foo/index.js');
                t.equal(content, 'module.exports = {\n    bar: require(\'./bar\'),\n    data: require(\'./data.json\')\n};\n');
            }
        }
    };

    const config = { ...defaultConfig, type: 'cjs' };
    const io = { fs, glob };
    const { codeGeneration } = compose({ config, overrides: { io } });
    const { indexgen } = codeGeneration;
    indexgen('modules', 'js');
});
