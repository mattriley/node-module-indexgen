const test = require('tape');
const configure = require('../src/configure');

test('generates index files', t => {
    t.plan(2);

    const glob = (pattern, options) => {
        if (pattern === 'modules/**') return ['foo'];
        if (pattern === '*/' && options.cwd === 'foo') return [];
        if (pattern === '*.{js,json}' && options.cwd === 'foo') return ['bar.js', 'data.json'];
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

    const config = { type: 'cjs' };
    const io = { fs, glob };
    const { indexgen } = configure(config, { io });
    indexgen('modules');
});
