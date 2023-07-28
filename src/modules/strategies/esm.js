module.exports = ({ util }) => ({ files }) => {

    const imports = files.map(f => {
        const exportKey = util.trimLeadingIllegalJsChars(f.exportKey);
        return `import ${exportKey} from '${f.importPath}';`;
    });

    const lines = files.map(f => `    ${f.exportKey}`).join(',\n');
    return `${imports.join('\n')}\n\nexport default {\n${lines}\n};\n`;

};
