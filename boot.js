const merge = require('lodash.merge');
const composeSrc = require('module-composer')(require('./src'));

module.exports = (overrides = {}) => {

    const compose = (key, arg) => merge(composeSrc(key, arg), overrides[key]);

    const config = compose('config');
    const io = compose('io');
    const providers = compose('providers');
    const provider = providers.cjs;
    const util = compose('util');
    const codeGeneration = compose('codeGeneration', { config, io, util, provider });
    
    return { codeGeneration };

};
