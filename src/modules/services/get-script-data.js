module.exports = ({ services, providers, config }) => dirData => {

    const { dirPath, childPaths } = dirData;
    const childDataList = childPaths.map(childPath => services.getFileData({ childPath }));
    const files = Object.fromEntries(childDataList.map(({ key, importPath }) => [key, importPath]));
    const script = providers[config.type]({ files });
    return { dirPath, script };

};
