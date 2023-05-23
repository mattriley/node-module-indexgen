const path = require('path');

module.exports = ({ fsx, constants }) => scriptDataList => {

    const mapper = async scriptData => {
        const filePath = path.join(scriptData.dirPath, constants.filename);
        const [readError, currentValue] = await fsx.readFile(filePath);
        if (readError && readError.code !== 'ENOENT') console.error(readError);

        const unchanged = currentValue === scriptData.script;
        if (unchanged) return;
        const [writeError] = await fsx.writeFile(filePath, scriptData.script);

        if (writeError) {
            console.log(`      Error ${filePath}`);
            console.error(writeError);
        } else {
            const assumeExists = !readError;
            const action = assumeExists ? 'Regenerated' : '  Generated';
            console.log(`${action} ${filePath}`);
        }
    };

    return Promise.all(scriptDataList.map(mapper));
};
