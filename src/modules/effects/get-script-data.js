module.exports = ({ effects, strategies, config }) => dirData => {

    const { dirPath, childPaths } = dirData;
    const configOverride = config.overrides?.[dirData.targetDir] ?? {};
    const childDataList = childPaths.map(childPath => effects.getFileData(childPath, configOverride));

    const files = childDataList.sort((a, b) => {
        if (a.key < b.key) return -1;
        if (a.key > b.key) return 1;
        return 0;
    });

    const script = strategies[config.type]({ files });
    return { dirPath, script };

};
