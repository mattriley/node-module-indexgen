module.exports = ({ util }) => dirData => {

    // Valid JS identifier?
    const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

    // Make a safe local binding name from any exportName
    const toSafeIdent = name => {
        // keep your existing leading-char rule, then normalize the rest
        let s = util.trimLeadingIllegalJsChars(name);
        s = s.replace(/[^A-Za-z0-9_$]/g, '_');
        if (!/^[A-Za-z_$]/.test(s)) {
            s = '_' + s;
        }
        return s;
    };

    // Preserve the original (possibly dotted) key; derive a safe local import name
    const items = dirData.files.map(f => {
        const keyName = f.exportName; // public API key (may be 'baz.qux', start with digit, etc.)
        const localName = IDENT_RE.test(keyName)
            ? util.trimLeadingIllegalJsChars(keyName) // fine to use as-is (after your trim)
            : toSafeIdent(keyName);

        return { keyName, localName, importPath: f.importPath };
    });

    const imports = items.map(i => `import { default as ${i.localName} } from '${i.importPath}';`);

    const lines = items.map(i => {
        // If the key is a legal identifier and matches the local binding, we can use shorthand.
        if (IDENT_RE.test(i.keyName) && i.keyName === i.localName) {
            return `    ${i.keyName}`;
        }
        // Otherwise quote the key and map to the safe local identifier.
        return `    '${i.keyName}': ${i.localName}`;
    }).join(',\n');

    return `${imports.join('\n')}\n\nexport default {\n${lines}\n};\n`;

};
