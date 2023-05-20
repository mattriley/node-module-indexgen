module.exports = ({ lib, util, config }) => (pathname, configOverride) => {

    const configFinal = { ...config, ...configOverride };

    const isDir = pathname.endsWith('/');
    const ext = util.extname(pathname);
    const basenameWithoutExt = util.basenameWithoutExt(pathname);

    const key = lib.getExportKey(pathname, configFinal);

    const fullySpecified = configFinal.fullySpecified || ext === '.json';
    const pathWithoutExt = fullySpecified ? pathname : basenameWithoutExt;
    const fullySpecifiedImportPath = isDir ? pathname + configFinal.filename : pathname;
    const importPath = fullySpecified ? fullySpecifiedImportPath : pathWithoutExt;
    return { key, importPath: `./${importPath}` };

};
