module.exports = () => ({ files }) => {

    // TODO: How would quoting keys work in ESM?
    // const getKey = k => util.legalJsName(k) ? k : `'${k}'`;

    const imports = files.map(({ key, importPath }) => `import ${key} from '${importPath}';`);
    const lines = files.map(({ key }) => `    ${key}`).join(',\n');
    return `${imports.join('\n')}\n\nexport default {\n${lines}\n};\n`;

};
