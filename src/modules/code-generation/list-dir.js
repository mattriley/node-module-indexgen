module.exports = ({ config, io }) => async targetDir => {

    const dirPaths = await io.glob(`${targetDir}/**`, { ignore: config.ignore, onlyDirectories: true });
    return Promise.all([targetDir, ...dirPaths].map(async dirPath => {
        const childDirPaths = await io.glob('*', { cwd: dirPath, onlyDirectories: true });
        const childFilePaths = await io.glob(config.only, { cwd: dirPath, onlyFiles: true, globstar: false });
        const filePaths = childDirPaths.concat(childFilePaths);
        return { dirPath, filePaths };
    }));

};
