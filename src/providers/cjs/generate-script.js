module.exports = moduleInfo => {
    const { modulename, filesByKey } = moduleInfo;
    const assignments = Object.entries(filesByKey).map(([key, path]) => [key, `require('${path}')`]);
    const entries = [['__modulename', `'${modulename}'`], ...assignments];
    const lines = entries.map(([k, v]) => `    ${k}: ${v}`).join(',\n');
    const content = `module.exports = {\n${lines}\n};\n`;
    return { content };
};
