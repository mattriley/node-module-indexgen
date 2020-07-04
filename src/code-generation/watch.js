const path = require('path');

module.exports = ({ codeGeneration, io }) => ({ targetDir, ext }) => {
    io.fs.watch(targetDir, { recursive: true }, (eventType, filename) => {
        if (path.basename(filename) === `index.${ext}`) return;
        codeGeneration.generateFiles(targetDir, ext);
    });    
};
