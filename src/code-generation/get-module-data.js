const camelCase = require('lodash.camelcase');
const path = require('path');

module.exports = ({ io, codeGeneration }) => async dirPath => {
    const modulename = camelCase(path.basename(dirPath));
    const filePaths = await io.glob('*', { cwd: dirPath });
    const filesByKey = Object.assign({}, ...filePaths.map(codeGeneration.getFileData));
    delete filesByKey.index;
    return { dirPath, modulename, filesByKey };
};
