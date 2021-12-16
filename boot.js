const src = require('./src');
const composer = require('module-composer');

module.exports = (overrides = {}) => {

    const compose = composer(src, {}, overrides);

    const config = compose('config');
    const io = compose('io');
    const providers = compose('providers');
    const provider = providers.cjs;
    const util = compose('util');
    const codeGeneration = compose('codeGeneration', { config, io, util, provider });

    return { codeGeneration };

};
