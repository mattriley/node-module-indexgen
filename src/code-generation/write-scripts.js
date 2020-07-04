const path = require('path');

module.exports = ({ io }) => (scriptDataList, ext) => {
    return Promise.all(scriptDataList.map(scriptData => {
        const filePath = path.join(scriptData.dirPath, `index.${ext}`);
        return io.fs.promises.writeFile(filePath, scriptData.script);
    }));
};
