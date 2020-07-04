const { init } = require('module-initialiser');
const src = require('./src');

const config = {
    ignore: '**/node_modules/**'
};

module.exports = ({ io }) => {
    const provider = src.providers.cjs;
    const util = init(src.util, {});
    const codeGeneration = init(src.codeGeneration, { config, io, util, provider });
    return { codeGeneration };
};
