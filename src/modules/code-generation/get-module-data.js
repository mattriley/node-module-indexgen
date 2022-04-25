module.exports = ({ codeGeneration }) => dirData => {

    const { dirPath, filePaths } = dirData;
    const fileDataList = filePaths.map(filePath => codeGeneration.getFileData({ filePath, dirPath }));
    const files = Object.assign({}, ...fileDataList.map(({ key, path }) => ({ [key]: path })));
    delete files.index;
    return { dirPath, files };

};
