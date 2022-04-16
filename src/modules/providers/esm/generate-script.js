module.exports = () => moduleData => {
    const { files } = moduleData;
    const sortedKeys = Object.keys(files).sort();
    const imports = sortedKeys.map(key => `import ${key} from '${files[key]}';`);
    const lines = sortedKeys.map(key => `    ${key}`).join(',\n');
    return `${imports}\n\nexport default {\n${lines}\n};\n`;
};
