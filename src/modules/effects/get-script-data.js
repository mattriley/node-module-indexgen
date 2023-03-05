module.exports = ({ effects, io, strategies, config }) => dirData => {

    const { dirPath, childPaths } = dirData;

    // TODO: Refactor.
    const configOverridePath = `${dirPath}/indexgen.config.json`;
    const configOverride = io.fs.existsSync(configOverridePath) ? JSON.parse(io.fs.readFileSync(configOverridePath, 'utf-8')) : {};

    const childDataList = childPaths.map(childPath => effects.getFileData(childPath, configOverride));

    const files = childDataList.sort((a, b) => {
        if (a.key < b.key) return -1;
        if (a.key > b.key) return 1;
        return 0;
    });

    const script = strategies[config.type]({ files });
    return { dirPath, script };

};
