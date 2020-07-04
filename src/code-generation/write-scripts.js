const path = require('path');

module.exports = ({ io }) => listOfScriptData => {
    return Promise.all(listOfScriptData.map(scriptData => {
        const filePath = path.join(scriptData.dirPath, 'index.js');
        return io.fs.promises.writeFile(filePath, scriptData.script);
    }));
};
