module.exports = ({ io, codeGeneration, provider }) => async pattern => {
    const dirOnlyPattern = pattern.endsWith('/') ? pattern : `${pattern}/`;
    const dirPaths = await io.glob(dirOnlyPattern, { ignore: '**/node_modules/**' });
    const moduleInfos = await Promise.all(dirPaths.map(codeGeneration.getModuleInfo));
    return moduleInfos.map(moduleInfo => ({ ...moduleInfo, ...provider.generateScript(moduleInfo) }));
};
