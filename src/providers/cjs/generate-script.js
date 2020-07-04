module.exports = moduleData => {
    const { modulename, files } = moduleData;
    const assignments = Object.entries(files).map(([key, path]) => [key, `require('${path}')`]);
    const entries = [['__modulename', `'${modulename}'`], ...assignments];
    const lines = entries.map(([k, v]) => `    ${k}: ${v}`).join(',\n');
    return `module.exports = {\n${lines}\n};\n`;
};
