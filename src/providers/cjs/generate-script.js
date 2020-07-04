module.exports = moduleInfo => {
    const { modulename, dependencies } = moduleInfo;
    const assignments = dependencies.map(dep => [dep.identifier, `require('${dep.requirePath}')`]);
    const entries = [['__modulename', `'${modulename}'`], ...assignments];
    const lines = entries.map(([k, v]) => `    ${k}: ${v}`).join(',\n');
    const content = `module.exports = {\n${lines}\n};\n`;
    return { content };
};
