const path = require('path');

module.exports = ({ codeGeneration, config, io }) => (targetDir = config.defaults.targetDir) => {
    io.fs.watch(targetDir, { recursive: true }, (eventType, filename) => {
        if (path.basename(filename) === 'index.js') return;
        codeGeneration.generateFiles(targetDir);
    });    
};
