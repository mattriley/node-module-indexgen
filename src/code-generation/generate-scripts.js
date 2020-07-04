module.exports = ({ io, codeGeneration }) => async pattern => {
    const dirOnlyPattern = pattern.endsWith('/') ? pattern : `${pattern}/`;
    const dirPaths = await io.glob(dirOnlyPattern, { ignore: '**/node_modules/**' });
    const listOfDirData = await Promise.all(dirPaths.map(async dirPath => {
        const filePaths = await io.glob('*', { cwd: dirPath });
        return { dirPath, filePaths };
    }));
    
    return listOfDirData
        .map(codeGeneration.getModuleData)
        .map(codeGeneration.getScriptData);
};
