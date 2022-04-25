module.exports = ({ codeGeneration }) => dirData => {

    const { dirPath, childPaths } = dirData;
    const fileDataList = childPaths.map(childPath => codeGeneration.getFileData({ childPath }));
    const files = Object.fromEntries(fileDataList.map(({ key, importPath }) => [key, importPath]));
    delete files.index;
    return { dirPath, files };

};
