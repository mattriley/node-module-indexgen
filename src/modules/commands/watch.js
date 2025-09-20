const path = require('path');

module.exports = ({ commands, io, config }) => targetDir => {
    const state = { timeoutId: null };

    const generateFilesDelayed = () => {
        if (state.timeoutId) return;
        state.timeoutId = setTimeout(() => {
            clearTimeout(state.timeoutId);
            state.timeoutId = null;
            commands.indexgen(targetDir);
        }, config.watchDelay);
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
