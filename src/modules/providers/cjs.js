module.exports = () => ({ files }) => {

    const assignments = files.map(({ key, importPath }) => [key, `require('${importPath}')`]);
    const lines = assignments.map(([k, v]) => `    ${k}: ${v}`).join(',\n');
    return `module.exports = {\n${lines}\n};\n`;

};
