const path = require('path');

module.exports = ({ fsx, config }) => (scriptDataList) => {
    const toStr = v => (v == null ? v : String(v));

    const writeOne = async ({ dirPath, script }) => {
        const filePath = path.join(dirPath, config.filename);

        const [readErr, current] = await fsx.readFile(filePath);

        // If read failed for a reason other than "not found", log it but continue
        if (readErr && readErr.code !== 'ENOENT') {
            console.error(readErr);
        }

        const existed = !readErr;
        const currentText = existed ? toStr(current) : null;

        // No change — skip write & logging
        if (existed && currentText === script) {
            return;
        }

        const [writeErr] = await fsx.writeFile(filePath, script);
        if (writeErr) {
            console.log(`      Error ${filePath}`);
            console.error(writeErr);
            return;
        }

        // Success
        console.log(`${existed ? 'Regenerated' : '  Generated'} ${filePath}`);
    };

    return Promise.all(scriptDataList.map(writeOne));
};
