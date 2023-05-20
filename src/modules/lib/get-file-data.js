module.exports = ({ lib, config }) => (pathname, configOverride) => {

    const configFinal = { ...config, ...configOverride };
    const key = lib.getExportKey(pathname, configFinal);
    const importPath = lib.getImportPath(pathname, configFinal);
    return { key, importPath };

};
