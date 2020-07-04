module.exports = ({ config, codeGeneration }) => async (pattern = config.defaultPattern) => {
    const scripts = await codeGeneration.generateScripts(pattern);
    await codeGeneration.writeScripts(scripts);
};
