module.exports = ({ codeGeneration }) => dirData => {

    const { dirPath, childPaths } = dirData;
    const childDataList = childPaths.map(childPath => codeGeneration.getFileData({ childPath }));
    const files = Object.fromEntries(childDataList.map(({ key, importPath }) => [key, importPath]));
    return { dirPath, files };

};
