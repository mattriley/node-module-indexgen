module.exports = ({ lib }) => (pathname, config) => {

    const key = lib.getExportKey(pathname, config);
    const importPath = lib.getImportPath(pathname, config);
    return { key, importPath };

};
