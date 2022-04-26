const path = require('path');

const IN_A_SEC = 1000;

module.exports = ({ commands, io, config }) => targetDir => {

    let timeoutId = null;

    const generateFiles = delay => {
        if (timeoutId) return;
        timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            timeoutId = null;
            commands.indexgen(targetDir);
        }, delay);
    };

    // TODO: consider removing recursive since now using globs

    try {
        io.fs.watch(targetDir, { recursive: true }, (eventType, filename) => {
            if (path.basename(filename) === config.filename) return;
            generateFiles(IN_A_SEC);
        });
    } catch (err) {
        console.warn(err.message);
    }

};
