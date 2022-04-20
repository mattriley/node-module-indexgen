module.exports = ({ config, io }) => async targetDir => {
    const pattern = targetDir;
    const dirPaths = await io.glob(pattern, { ignore: config.ignore, onlyDirectories: true });
    return Promise.all(dirPaths.map(async dirPath => {
        const childDirPaths = await io.glob('*/', { cwd: dirPath, onlyDirectories: true });
        const childFilePaths = await io.glob('*.{js,json}', { cwd: dirPath });
        const filePaths = childDirPaths.concat(childFilePaths);
        return { dirPath, filePaths };
    }));
};
