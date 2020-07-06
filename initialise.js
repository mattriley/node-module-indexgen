const compose = require('module-composer');
const config = require('./config');
const src = require('./src');

module.exports = ({ io }) => {
    const provider = src.providers.cjs;
    const util = compose(src.util, {});
    const codeGeneration = compose(src.codeGeneration, { config, io, util, provider });
    return { codeGeneration };
};
