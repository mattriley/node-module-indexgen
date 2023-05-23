module.exports = ({ constants, io }) => async targetDir => {

    const dirPaths = await io.glob(`${targetDir}/**`, {
        ignore: constants.ignore,
        onlyDirectories: true
    });

    const mapper = async dirPath => {
        const childDirPaths = await io.glob('*', {
            cwd: dirPath,
            onlyDirectories: true,
            markDirectories: true
        });

        const childFilePaths = await io.glob(constants.only, {
            cwd: dirPath,
            onlyFiles: true,
            globstar: false,
            ignore: [constants.filename, 'indexgen.config.json']
        });

        const childPaths = [...childDirPaths, ...childFilePaths];
        return { targetDir, dirPath, childPaths };
    };

    const targetDirs = [targetDir, ...dirPaths];
    return Promise.all(targetDirs.map(mapper));

};
