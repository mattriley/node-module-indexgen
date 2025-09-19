const path = require('path');

module.exports = ({ config, fsx, io }) => async targetDir => {

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

        const pattern = `*{${config.applicableExtensions.join(',')}}`;

        const childFilePaths = await io.glob(pattern, {
            cwd: dirPath,
            onlyFiles: true,
            globstar: false,
            ignore: [config.filename, 'indexgen.config.json']
        });

        const childPaths = [...childDirPaths, ...childFilePaths];
        const childFiles = childPaths.filter(childPath => fsx.isFile(path.join(dirPath, childPath)));

        return { targetDir, dirPath, childPaths, childFiles };
    };

    const targetDirs = [targetDir, ...dirPaths];

    return Promise.all(targetDirs.map(mapper));

};
