const path = require('path');

module.exports = ({ commands, io, config }) => targetDir => {

    let timeoutId = null;

    const generateFilesDelayed = () => {
        if (timeoutId) return;
        timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            timeoutId = null;
            commands.indexgen(targetDir);
        }, config.watchDelayMilliseconds);
    };

    try {
        io.fs.watch(targetDir, { recursive: true }, (eventType, filename) => {
            if (path.basename(filename) === config.filename) return;
            generateFilesDelayed();
        });
    } catch (err) {
        console.warn(err.message);
    }

};
