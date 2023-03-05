module.exports = ({ util }) => ({ files }) => {

    const getKey = k => util.legalJsName(k) ? k : `'${k}'`;

    const assignments = files.map(({ key, importPath }) => [key, `require('${importPath}')`]);
    const lines = assignments.map(([k, v]) => `    ${getKey(k)}: ${v}`).join(',\n');
    return `module.exports = {\n${lines}\n};\n`;

};
