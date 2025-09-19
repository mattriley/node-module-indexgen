const composer = require('module-composer');
const modules = require('./modules');
const defaults = require('./defaults.js');
const normalise = require('./normalise.js');

module.exports = ({ overrides, config } = {}) => {
    const { configure } = composer(modules, { overrides });
    const { compose } = configure(defaults, config, normalise);
    const { io } = compose('io');
    const { util } = compose('util');
    const { renderers } = compose('renderers', { util });
    const { fsx } = compose('fsx', { io, util });
    const { core } = compose('core', { renderers, util });
    return compose('commands', { core, fsx, io });
};
