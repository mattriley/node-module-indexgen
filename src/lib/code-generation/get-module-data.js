const camelCase = require('lodash.camelcase');
const path = require('path');

module.exports = ({ codeGeneration }) => dirData => {
    const { dirPath, filePaths } = dirData;
    const modulename = camelCase(path.basename(dirPath));
    const fileDataList = filePaths.map(codeGeneration.getFileData);
    const files = Object.assign({}, ...fileDataList.map(({ key, path }) => ({ [key]: path })));
    delete files.index;
    return { dirPath, modulename, files };
};
