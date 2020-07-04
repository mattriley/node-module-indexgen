const path = require('path');
const _ = require('lodash');
const existingIndexFile = depInfo => depInfo.identifier !== 'index';

module.exports = ({ io, codeGeneration }) => async dirPath => {
    const modulename = _.camelCase(path.basename(dirPath));
    const filePaths = await io.glob('*', { cwd: dirPath });
    const dependencies = filePaths.map(codeGeneration.getDependencyInfo).filter(existingIndexFile);
    const uniqueDependencies = _.uniqBy(dependencies, 'identifier');
    return { dirPath, modulename, dependencies: uniqueDependencies };
};
