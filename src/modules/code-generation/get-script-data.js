module.exports = ({ codeGeneration, providers, config }) => dirData => {

    const { dirPath, childPaths } = dirData;
    const childDataList = childPaths.map(childPath => codeGeneration.getFileData({ childPath }));
    const files = Object.fromEntries(childDataList.map(({ key, importPath }) => [key, importPath]));
    const script = providers[config.type].generateScript({ files });
    return { dirPath, script };

};
