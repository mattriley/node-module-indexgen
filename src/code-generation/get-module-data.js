const camelCase = require('lodash.camelcase');
const path = require('path');

module.exports = ({ codeGeneration }) => dirData => {
    const { dirPath, filePaths } = dirData;
    const modulename = camelCase(path.basename(dirPath));
    const listOfFileData = filePaths.map(codeGeneration.getFileData);
    const files = Object.assign({}, ...listOfFileData.map(({ key, path }) => ({ [key]: path })));
    delete files.index;
    return { dirPath, modulename, files };
};
