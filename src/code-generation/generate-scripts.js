module.exports = ({ io, codeGeneration, provider }) => async pattern => {
    const dirOnlyPattern = pattern.endsWith('/') ? pattern : `${pattern}/`;
    const unfilteredDirPaths = await io.glob(dirOnlyPattern, { ignore: '**/node_modules/**' });

    // remove paths that don't contain .js files.
    const dirPaths = await Promise.all(unfilteredDirPaths.filter(async dirPath => {
        const filePaths = await io.glob('**/*.js', { cwd: dirPath, ignore: '**/index.js' });
        return filePaths.length > 0;
    }));

    const moduleInfos = await Promise.all(dirPaths.map(codeGeneration.getModuleInfo));
    return moduleInfos.map(moduleInfo => ({ ...moduleInfo, ...provider.generateScript(moduleInfo) }));
};
