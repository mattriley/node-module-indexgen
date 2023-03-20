module.exports = ({ util }) => ({ files }) => {

    const getKey = k => util.legalJsName(k) ? k : `'${k}'`;
    const assignments = files.map(f => [f.key, `require('${f.importPath}')`]);
    const lines = assignments.map(([k, v]) => `    ${getKey(k)}: ${v}`).join(',\n');
    return `module.exports = {\n${lines}\n};\n`;

};
