module.exports = ({ services, providers, config }) => dirData => {

    const { dirPath, childPaths } = dirData;
    const childDataList = childPaths.map(childPath => services.getFileData({ childPath }));

    const files = childDataList.sort((a, b) => {
        if (a.key < b.key) return -1;
        if (a.key > b.key) return 1;
        return 0;
    });

    //const files = Object.fromEntries(sortedChildDataList.map(({ key, importPath }) => [key, importPath]));
    const script = providers[config.type]({ files });
    return { dirPath, script };

};
