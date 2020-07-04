module.exports = ({ config, io }) => async pattern => {
    const dirOnlyPattern = pattern.endsWith('/') ? pattern : `${pattern}/`;
    const dirPaths = await io.glob(dirOnlyPattern, { ignore: config.ignore });
    return Promise.all(dirPaths.map(async dirPath => {
        const filePaths = await io.glob('*', { cwd: dirPath });
        return { dirPath, filePaths };
    }));
};
