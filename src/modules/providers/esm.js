module.exports = () => ({ files }) => {

    const sortedKeys = Object.keys(files).sort();
    const imports = sortedKeys.map(key => `import ${key} from '${files[key]}';`);
    const lines = sortedKeys.map(key => `    ${key}`).join(',\n');
    return `${imports.join('\n')}\n\nexport default {\n${lines}\n};\n`;

};
