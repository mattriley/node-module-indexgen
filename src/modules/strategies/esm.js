module.exports = () => ({ files }) => {

    const imports = files.map(({ key, importPath }) => `import ${key} from '${importPath}';`);
    const lines = files.map(({ key }) => `    ${key}`).join(',\n');
    return `${imports.join('\n')}\n\nexport default {\n${lines}\n};\n`;

};
