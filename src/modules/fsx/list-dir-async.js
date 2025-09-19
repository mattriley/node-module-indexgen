module.exports = ({ config, io }) => async targetDir => {

    const dirPaths = await io.glob(`${targetDir}/**`, {
        ignore: [config.ignore].flat(),
        onlyDirectories: true
    });

    const mapper = async dirPath => {

        const childDirPaths = await io.glob('*', {
            cwd: dirPath,
            onlyDirectories: true,
            markDirectories: true
        });

        const pattern = `*.{${config.applicableExtensions.join(',')}}`;

        const childFilePaths = await io.glob(pattern, {
            cwd: dirPath,
            onlyFiles: true,
            globstar: false,
            ignore: [config.filename, 'indexgen.config.json']
        });

        let childPaths = [...childDirPaths, ...childFilePaths];
        childPaths = Array.from(new Set(childPaths));


        return { targetDir, dirPath, childPaths };
    };

    const targetDirs = [targetDir, ...dirPaths];

    return Promise.all(targetDirs.map(mapper));

};
