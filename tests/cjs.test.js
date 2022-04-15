const test = require('tape');
const boot = require('../boot');

test('generates index files', t => {
    t.plan(2);

    const glob = (pattern, options) => {
        if (pattern === 'src/**/') return ['foo'];        
        if (pattern === '*/' && options.cwd === 'foo') return [];
        if (pattern === '*.{js,cjs}' && options.cwd === 'foo') return ['bar.js', 'index.js'];
    };  

    const fs = {
        promises: {
            access: () => Promise.reject(),
            writeFile: (filename, content) => {
                t.equal(filename, 'foo/index.js');
                t.equal(content, 'module.exports = {\n    bar: require(\'./bar\')\n};\n');
            }
        }
    };

    const io = { fs, glob };
    const { indexgen } = boot({ io }).codeGeneration.getCommands();
    indexgen('src', 'js');
});
