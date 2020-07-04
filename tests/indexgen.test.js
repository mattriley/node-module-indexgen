const test = require('tape');
const initialise = require('../initialise');

test('generates index files', t => {
    t.plan(2);

    const glob = (pattern, options) => {
        if (pattern === '*/') return ['foo'];        
        if (pattern === '*' && options.cwd === 'foo') return ['bar.js', 'index.js'];
        if (pattern === '**/*.js' && options.cwd === 'foo') return ['bar.js', 'index.js'];
    };

    const fs = {
        promises: {
            writeFile: (filename, content) => {
                t.equal(filename, 'foo/index.js');
                t.equal(content, "module.exports = {\n    __modulename: 'foo',\n    bar: require('./bar')\n};\n");
            }
        }
    };

    const io = { fs, glob }
    const { indexgen } = initialise({ io });
    indexgen('*/');
});

test('ensure only directories matched', t => {
    t.plan(1);

    const glob = pattern => {
        if (pattern === '*/') {
            // Note forward slash appended.
            t.pass('forward slash appended to match directories only');
            return [];
        }
    };

    const fs = {
        promises: {
            writeFile: () => {}
        }
    };

    const io = { fs, glob }
    const { indexgen } = initialise({ io });
    indexgen('*'); // Note missing forward slash.
});

test('ignores node_modules', t => {
    t.plan(1);

    const glob = (pattern, options) => {
        if (pattern === '*/') {
            t.equal(options.ignore, '**/node_modules/**');
            return [];
        }
    };

    const fs = {
        promises: {
            writeFile: () => {}
        }
    };

    const io = { fs, glob }
    const { indexgen } = initialise({ io });
    indexgen('*');
});
