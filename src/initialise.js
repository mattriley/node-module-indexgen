const compose = require('module-composer');
const merge = require('lodash.merge');
const lib = require('./lib');

module.exports = (args = {}) => {

    const config = merge(lib.config(), args.config);
    const io = merge(lib.io(), args.io);
    const provider = lib.providers.cjs;
    const util = compose(lib.util, {});
    const codeGeneration = compose(lib.codeGeneration, { config, io, util, provider });
    
    return { codeGeneration };

};
