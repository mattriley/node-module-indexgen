module.exports = ({ util }) => dirData => {
    // Valid JS identifier?
    const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

    // Make a safe local binding name from any exportName
    const toSafeIdent = name => {
        const trimmed = util.trimLeadingIllegalJsChars(name);
        const normalized = trimmed.replace(/[^A-Za-z0-9_$]/g, '_');
        const startsOK = /^[A-Za-z_$]/.test(normalized);
        return startsOK ? normalized : `_${normalized}`;
    };

    // Preserve the original (possibly dotted) key; derive a safe local import name
    const items = dirData.files.map(f => {
        const keyName = f.exportName; // public API key (may be 'baz.qux', start with digit, etc.)
        const isIdent = IDENT_RE.test(keyName);
        const localName = isIdent ? util.trimLeadingIllegalJsChars(keyName) : toSafeIdent(keyName);
        return { keyName, localName, importPath: f.importPath };
    });

    const imports = items.map(i => `import { default as ${i.localName} } from '${i.importPath}';`);

    const lines = items
        .map(i => {
            // If the key is a legal identifier and matches the local binding, we can use shorthand.
            if (IDENT_RE.test(i.keyName) && i.keyName === i.localName) return `    ${i.keyName}`;
            // Otherwise quote the key and map to the safe local identifier.
            return `    '${i.keyName}': ${i.localName}`;
        })
        .join('\n,')
        .replace(/\n,/g, ',\n'); // keep one-per-line formatting without trailing comma logic

    return `${imports.join('\n')}\n\nexport default {\n${lines}\n};\n`;
};
