module.exports = ({ util }) => ({ files }) => {

    const filesModified = files.map(f => {
        const exportName = util.trimLeadingIllegalJsChars(f.exportName);
        return { ...f, exportName };
    });

    const imports = filesModified.map(f => `import ${f.exportName} from '${f.importPath}';`);
    const lines = filesModified.map(f => `    ${f.exportName}`).join(',\n');
    return `${imports.join('\n')}\n\nexport default {\n${lines}\n};\n`;

};
