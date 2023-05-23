const defaultConfig = require('./default-config.js');
const modules = require('./modules');
const composer = require('module-composer');
require('module-composer/extensions/access-modifiers');

module.exports = ({ overrides, config }) => {

    const { configure } = composer(modules, { overrides });

    const { compose, constants } = configure(defaultConfig, config, config => {
        const fullySpecified = config.fullySpecified ?? config.type === 'esm';
        return { fullySpecified };
    });

    const { io } = compose('io', {}, io => io.setup());
    const { util } = compose('util');
    const { strategies } = compose('strategies', { util });
    const { lib } = compose('lib', { strategies, util, constants });
    const { fsx } = compose('fsx', { constants, io });
    compose('commands', { fsx, lib, io, constants });
    return compose.end();

};
