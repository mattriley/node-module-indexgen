module.exports = ({ self, config }) => dirData => {

    const { childPaths } = dirData;
    const configOverride = config.overrides?.[dirData.targetDir] ?? {};
    const configFinal = { ...config, ...configOverride };

    const childDataList = childPaths.map(childPath => {
        const isFile = dirData.childFiles.includes(childPath);
        const exportName = self.getExportName(childPath, configFinal, { isFile });
        const importPath = self.getImportPath(childPath, configFinal);
        return { exportName, importPath };
    });

    const sortFiles = childDataList => {
        const filesByPath = Object.fromEntries(childDataList.map(f => [f.importPath, f]));
        const collator = new Intl.Collator([], { numeric: true });
        const sortedPaths = Object.keys(filesByPath).sort((a, b) => collator.compare(a, b));
        return sortedPaths.map(path => filesByPath[path]);
    }

    return sortFiles(childDataList);

};
