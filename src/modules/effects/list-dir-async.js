module.exports = ({ config, io }) => async targetDir => {

    const dirPaths = await io.glob(`${targetDir}/**`, {
        ignore: config.ignore,
        onlyDirectories: true
    });

    const mapper = async dirPath => {
        const childDirPaths = await io.glob('*', {
            cwd: dirPath,
            onlyDirectories: true,
            markDirectories: true
        });

        const childFilePaths = await io.glob(config.only, {
            cwd: dirPath,
            onlyFiles: true,
            globstar: false,
            ignore: [config.filename, 'indexgen.config.json']
        });

        const childPaths = [...childDirPaths, ...childFilePaths];
        return { dirPath, childPaths };
    };

    const targetDirs = [targetDir, ...dirPaths];
    return Promise.all(targetDirs.map(mapper));

};
