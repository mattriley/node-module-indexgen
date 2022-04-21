const path = require('path');

const IN_A_SEC = 1000;

module.exports = ({ codeGeneration, io }) => (targetDir, ext) => {

    let timeoutId = null;

    const generateFiles = delay => {
        if (timeoutId) return;
        timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            timeoutId = null;
            codeGeneration.generateFiles(targetDir, ext);
        }, delay);
    };

    // TODO: consider removing recursive since now using globs

    try {
        io.fs.watch(targetDir, { recursive: true }, (eventType, filename) => {
            if (path.basename(filename) === `index.${ext}`) return;
            generateFiles(IN_A_SEC);
        });
    } catch (err) {
        console.warn(err.message);
    }

};
