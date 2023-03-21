module.exports = ({ effects, strategies, config }) => dirData => {

    const { dirPath, childPaths } = dirData;
    const configOverride = config.overrides?.[dirData.targetDir] ?? {};
    const childDataList = childPaths.map(childPath => effects.getFileData(childPath, configOverride));

    // TODO: option to sort by key or path name

    // sort by key
    // const files = childDataList.sort((a, b) => {
    //     if (a.key < b.key) return -1;
    //     if (a.key > b.key) return 1;
    //     return 0;
    // });

    // sort by path name
    const filesByPath = Object.fromEntries(childDataList.map(f => [f.importPath, f]));
    const collator = new Intl.Collator([], { numeric: true });
    const sortedPaths = Object.keys(filesByPath).sort((a, b) => collator.compare(a, b));
    const files = sortedPaths.map(path => filesByPath[path]);
    const script = strategies[config.type]({ files });
    return { dirPath, script };

};
