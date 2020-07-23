const compose = require('module-composer');
const config = require('./config');
const lib = require('./lib');

module.exports = args => {

    const io = args.io || lib.io();
    const provider = lib.providers.cjs;
    const util = compose(lib.util, {});
    const codeGeneration = compose(lib.codeGeneration, { config, io, util, provider });
    return { codeGeneration };

};
