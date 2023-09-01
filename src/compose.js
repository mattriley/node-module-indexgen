const defaultConfig = require('./default-config.js');
const modules = require('./modules');
const composer = require('module-composer');

module.exports = ({ overrides, config }) => {

    const { configure } = composer(modules, { overrides });

    const { compose } = configure(defaultConfig, config, config => {
        return { fullySpecified: config.fullySpecified ?? config.type === 'esm' };
    });

    const { io } = compose('io');
    const { util } = compose('util');
    const { strategies } = compose('strategies', { util });
    const { lib } = compose('lib', { strategies, util });
    const { fsx } = compose('fsx', { io });
    return compose('commands', { fsx, lib, io });

};
