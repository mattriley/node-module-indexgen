const { init } = require('module-initialiser');
const src = require('./src');

const config = {
    defaultPattern: 'src/**/',
    ignore: '**/node_modules/**'
};

module.exports = ({ io }) => {
    const provider = src.providers.cjs;
    const util = init(src.util, {});
    const codeGeneration = init(src.codeGeneration, { config, io, util, provider });
    const indexgen = codeGeneration.generateFiles;
    return { indexgen, codeGeneration };
};
