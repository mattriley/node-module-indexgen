const path = require('path');

module.exports = ({ commands, io, constants }) => targetDir => {

    let timeoutId = null;

    const generateFilesDelayed = () => {
        if (timeoutId) return;
        timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            timeoutId = null;
            commands.indexgen(targetDir);
        }, constants.watchDelay);
    };

    try {
        io.fs.watch(targetDir, { recursive: true }, (eventType, filename) => {
            if (path.basename(filename) === constants.filename) return;
            generateFilesDelayed();
        });
    } catch (err) {
        console.warn(err.message);
    }

};
