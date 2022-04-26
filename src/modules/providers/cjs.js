module.exports = () => ({ files }) => {

    const assignments = Object.entries(files).map(([key, path]) => [key, `require('${path}')`]);
    const lines = assignments.map(([k, v]) => `    ${k}: ${v}`).join(',\n');
    return `module.exports = {\n${lines}\n};\n`;

};
