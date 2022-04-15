module.exports = ({ config, codeGeneration }) => () => {
    const exec = (command, args) => {
        const targetDir = args.dir || config.dir;
        const ext = args.ext || config.ext;
        command(targetDir, ext);
    };

    const indexgen = (dir, ext) => exec(codeGeneration.indexgen, { dir, ext });
    const watch = (dir, ext) => exec(codeGeneration.watch, { dir, ext });

    return { indexgen, watch };
};
