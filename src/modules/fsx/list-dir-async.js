const path = require('path');

module.exports = ({ config, fsx, io }) => async targetDir => {

    const dirPaths = await io.glob(`${targetDir}/**`, {
        ignore: [config.ignore].flat(),
        onlyDirectories: true
    });

    // helper: count dots
    const dotCount = s => {
        let n = 0;
        for (let i = 0; i < s.length; i++) {
            if (s.charCodeAt(i) === 46) { n++; } // '.' = 46
        }
        return n;
    };

    // comparator: most dots first, then alphabetical
    const byDotsDescThenAlpha = (a, b) => {
        const da = dotCount(a);
        const db = dotCount(b);
        if (da !== db) { return db - da; }
        return a < b ? -1 : a > b ? 1 : 0;
    };

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

        // Files: filter + sort
        const childFiles = [...childFilePaths]
            .filter(p => fsx.isFile(path.join(dirPath, p)))
            .sort(byDotsDescThenAlpha);

        // Dirs: sort with same comparator
        const childDirs = [...childDirPaths].sort(byDotsDescThenAlpha);

        // Files first, then dirs
        const childPaths = [...childFiles, ...childDirs];

        return { targetDir, dirPath, childPaths, childFiles, childDirs };
    };

    const targetDirs = [targetDir, ...dirPaths];

    return Promise.all(targetDirs.map(mapper));
};
