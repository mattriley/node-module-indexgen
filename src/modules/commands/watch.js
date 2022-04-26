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

    try {
        io.fs.watch(targetDir, { recursive: true }, (eventType, filename) => {
            if (path.basename(filename) === config.filename) return;
            generateFiles(IN_A_SEC);
        });
    } catch (err) {
        console.warn(err.message);
    }

};
