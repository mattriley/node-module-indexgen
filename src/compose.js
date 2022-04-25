const modules = require('./modules');
const composer = require('module-composer');

module.exports = ({ config, overrides }) => {

    const compose = composer(modules, { overrides });
    const { io } = compose('io', {}, io => io.setup());
    const { providers } = compose('providers');
    const { util } = compose('util');
    const { codeGeneration } = compose('codeGeneration', { config, io, util, providers });
    return compose('commands', { codeGeneration, io, config });

};
