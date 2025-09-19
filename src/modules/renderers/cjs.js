module.exports = ({ util }) => dirData => {

    const getKey = k => util.legalJsName(k) ? k : `'${k}'`;
    const assignments = dirData.files.map(f => [f.exportName, `require('${f.importPath}')`]);
    const lines = assignments.map(([k, v]) => `    ${getKey(k)}: ${v}`).join(',\n');
    return `module.exports = {\n${lines}\n};\n`;

};
