module.exports = ({ self, strategies, config }) => dirData => {

    const { childPaths } = dirData;
    const configOverride = config.overrides?.[dirData.targetDir] ?? {};

    const configFinal = { ...config, ...configOverride };

    const childDataList = childPaths.map(childPath => {
        const isFile = dirData.childFiles.includes(childPath);
        const exportKey = self.getExportKey(childPath, configFinal, { isFile });
        const importPath = self.getImportPath(childPath, configFinal);
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
    const script = strategies[config.type]({ files });
    return script;

};
