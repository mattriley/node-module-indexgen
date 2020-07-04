module.exports = ({ config, codeGeneration }) => () => {
    const exec = (command, args) => command({ ...config.defaults, args });
    const indexgen = (targetDir, ext) => exec(codeGeneration.indexgen, { targetDir, ext });
    const watch = (targetDir, ext) => exec(codeGeneration.watch, { targetDir, ext });
    return { indexgen, watch };
};