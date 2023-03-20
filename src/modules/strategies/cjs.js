module.exports = ({ util }) => ({ files }) => {

    const getKey = k => util.legalJsName(k) ? k : `'${k}'`;

    const filesByPath = Object.fromEntries(files.map(f => [f.importPath, f]));
    const sortedPaths = Object.keys(filesByPath).sort();
    const assignments = sortedPaths.map(path => [filesByPath[path].key, `require('${filesByPath[path].importPath}')`]);
    const lines = assignments.map(([k, v]) => `    ${getKey(k)}: ${v}`).join(',\n');
    return `module.exports = {\n${lines}\n};\n`;

};
