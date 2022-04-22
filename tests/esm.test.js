const test = require('tape');
const app = require('../src/app');

test('generates index files', t => {
    t.plan(2);

    const glob = (pattern, options) => {
        if (pattern === 'src/**') return ['foo'];
        if (pattern === '*/' && options.cwd === 'foo') return [];
        if (pattern === '*.{js,json}' && options.cwd === 'foo') return ['bar.js', 'data.json', 'index.js'];
    };

    const fs = {
        promises: {
            access: () => Promise.reject(),
            writeFile: (filename, content) => {
                t.equal(filename, 'foo/index.js');
                t.equal(content, 'import bar from \'./bar\';\nimport data from \'./data.json\';\n\nexport default {\n    bar,\n    data\n};\n');
            }
        }
    };

    const config = { type: 'esm' };
    const io = { fs, glob };
    const { indexgen } = app({ config, overrides: { io } });
    indexgen('src/**', 'js');
});
