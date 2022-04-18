const path = require('path');

module.exports = ({ config, io }) => async targetDir => {
    const pattern = path.join(targetDir, '**/');
    const dirPaths = await io.glob(pattern, { ignore: config.ignore, onlyDirectories: true });
    return Promise.all(dirPaths.map(async dirPath => {
        const childDirPaths = await io.glob('*/', { cwd: dirPath });
        const childFilePaths = await io.glob('*.{js,cjs}', { cwd: dirPath });
        const filePaths = childDirPaths.concat(childFilePaths);
        return { dirPath, filePaths };
    }));
};
