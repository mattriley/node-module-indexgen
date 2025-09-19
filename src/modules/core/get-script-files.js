module.exports = ({ self, config }) => dirData => {

    const { childPaths } = dirData;
    const configOverride = config.overrides?.[dirData.targetDir] ?? {};
    const configFinal = { ...config, ...configOverride };
    const sortedChildPaths = self.sortFiles(childPaths);

    const childDataList = sortedChildPaths.map(childPath => {
        const isFile = dirData.childFiles.includes(childPath);
        const exportName = self.getExportName(childPath, configFinal, { isFile });
        const importPath = self.getImportPath(childPath, configFinal);
        return { exportName, importPath };
    });

    return childDataList;

};
