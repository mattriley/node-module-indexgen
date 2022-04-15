module.exports = ({ codeGeneration }) => dirData => {
    const { dirPath, filePaths } = dirData;
    const fileDataList = filePaths.map(codeGeneration.getFileData);
    const files = Object.assign({}, ...fileDataList.map(({ key, path }) => ({ [key]: path })));
    delete files.index;
    return { dirPath, files };
};
