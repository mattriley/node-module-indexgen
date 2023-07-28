module.exports = ({ util }) => ({ files }) => {

    const filesModified = files.map(f => {
        const exportKey = util.trimLeadingIllegalJsChars(f.exportKey);
        return { ...f, exportKey };
    });

    const imports = filesModified.map(f => `import ${f.exportKey} from '${f.importPath}';`);
    const lines = filesModified.map(f => `    ${f.exportKey}`).join(',\n');
    return `${imports.join('\n')}\n\nexport default {\n${lines}\n};\n`;

};
