const defaultConfig = require('./default-config.js');
const modules = require('./modules');
const composer = require('module-composer');
require('module-composer/extensions/access-modifiers');

module.exports = ({ overrides, configs = [] }) => {

    const { configure } = composer(modules, { overrides });

    const { compose, config } = configure(defaultConfig, ...configs, config => {
        const fullySpecified = config.fullySpecified ?? config.type === 'esm';
        return { ...config, fullySpecified };
    });

    const { io } = compose('io', {}, io => io.setup());
    const { util } = compose('util');
    const { strategies } = compose('strategies', { util });
    const { lib } = compose('lib', { strategies, util, config });
    const { fsx } = compose('fsx', { config, io });
    compose('commands', { fsx, lib, io, config });
    return compose.end();

};
