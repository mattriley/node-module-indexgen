const { init } = require('@mattriley/module-initialiser');
const config = require('./config');
const src = require('./src');

module.exports = ({ io }) => {
    const provider = src.providers.cjs;
    const util = init(src.util, {});
    const codeGeneration = init(src.codeGeneration, { config, io, util, provider });
    return { codeGeneration };
};
