const defaultPattern = '**/src/**/';

module.exports = ({ codeGeneration }) => async (pattern = defaultPattern) => {
    const scripts = await codeGeneration.generateScripts(pattern);
    await codeGeneration.writeScripts(scripts);
};
