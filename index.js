const boot = require('./src/boot');
const defaultConfig = require('./src/config.json');

module.exports = (config = {}) => {

    const { codeGeneration } = boot({ config: { ...defaultConfig, ...config } });
    return codeGeneration.getCommands();

};
