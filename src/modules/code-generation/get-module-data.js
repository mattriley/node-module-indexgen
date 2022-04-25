module.exports = ({ codeGeneration }) => dirData => {

    const { dirPath, childPaths } = dirData;
    const fileDataList = childPaths.map(childPath => codeGeneration.getFileData({ childPath }));
    const files = Object.fromEntries(fileDataList.map(({ key, path }) => [key, path]));
    delete files.index;
    return { dirPath, files };

};
