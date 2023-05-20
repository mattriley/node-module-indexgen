module.exports = () => ({ files }) => {

    // TODO: How would quoting keys work in ESM?
    // const getKey = k => util.legalJsName(k) ? k : `'${k}'`;

    const imports = files.map(f => `import ${f.exportKey} from '${f.importPath}';`);
    const lines = files.map(f => `    ${f.exportKey}`).join(',\n');
    return `${imports.join('\n')}\n\nexport default {\n${lines}\n};\n`;

};
