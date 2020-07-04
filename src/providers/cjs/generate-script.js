module.exports = moduleData => {
    const { modulename, filesByKey } = moduleData;
    const assignments = Object.entries(filesByKey).map(([key, path]) => [key, `require('${path}')`]);
    const entries = [['__modulename', `'${modulename}'`], ...assignments];
    const lines = entries.map(([k, v]) => `    ${k}: ${v}`).join(',\n');
    return `module.exports = {\n${lines}\n};\n`;
};
