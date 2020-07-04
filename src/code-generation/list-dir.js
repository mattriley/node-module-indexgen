module.exports = ({ config, io }) => async pattern => {
    const dirOnlyPattern = pattern.endsWith('/') ? pattern : `${pattern}/`;
    const dirPaths = await io.glob(dirOnlyPattern, { ignore: config.ignore });
    return Promise.all(dirPaths.map(async dirPath => {
        const childDirPaths = await io.glob('*/', { cwd: dirPath });
        const childFilePaths = await io.glob('*.{js,cjs}', { cwd: dirPath });
        const filePaths = childDirPaths.concat(childFilePaths);
        return { dirPath, filePaths };
    }));
};
