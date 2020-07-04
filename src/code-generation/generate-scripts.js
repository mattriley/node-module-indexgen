module.exports = ({ io, codeGeneration }) => async pattern => {
    const dirOnlyPattern = pattern.endsWith('/') ? pattern : `${pattern}/`;
    const dirPaths = await io.glob(dirOnlyPattern, { ignore: '**/node_modules/**' });
    const listOfModuleData = await Promise.all(dirPaths.map(codeGeneration.getModuleData));
    return listOfModuleData.map(codeGeneration.getScriptData);
};
