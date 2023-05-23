module.exports = ({ lib, strategies, constants }) => dirData => {

    const { childPaths } = dirData;
    const constantsOverride = constants.overrides?.[dirData.targetDir] ?? {};

    const constantsFinal = { ...constants, ...constantsOverride };

    const childDataList = childPaths.map(childPath => {
        const exportKey = lib.getExportKey(childPath, constantsFinal);
        const importPath = lib.getImportPath(childPath, constantsFinal);
        return { exportKey, importPath };
    });

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
    const script = strategies[constants.type]({ files });
    return script;

};
