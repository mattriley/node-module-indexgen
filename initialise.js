const { init } = require('module-initialiser');
const src = require('./src');

const config = {
    defaultPattern: '**/src/**/'
};

module.exports = ({ io }) => {
    const provider = src.providers.cjs;
    const codeGeneration = init(src.codeGeneration, { config, io, provider });
    const indexgen = codeGeneration.generateFiles;
    return { indexgen, codeGeneration };
};
