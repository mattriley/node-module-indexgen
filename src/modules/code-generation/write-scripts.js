const path = require('path');

module.exports = ({ io, config }) => (scriptDataList) => {
    return Promise.all(scriptDataList.map(async scriptData => {
        const filePath = path.join(scriptData.dirPath, config.filename);

        try {
            const exists = await io.fs.promises.access(filePath, io.fs.F_OK).then(() => true).catch(() => false);

            if (exists) {
                const currentScript = await io.fs.promises.readFile(filePath, 'utf-8');
                if (currentScript === scriptData.script) return;
            }

            await io.fs.promises.writeFile(filePath, scriptData.script);
            console.log(`${exists ? 'Regenerated' : '  Generated'} ${filePath}`);
        } catch (err) {
            console.log(`      Error ${filePath}`);
            console.error(err);
        }

    }));
};
