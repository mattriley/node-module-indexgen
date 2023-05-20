const camelCase = require('lodash.camelcase');
const trimLeadingIllegalCharacters = str => str.replace(/^[^$_a-z]+/i, '');

module.exports = ({ util, config }) => (pathname, configOverride) => {

    const configFinal = { ...config, ...configOverride };

    const isDir = pathname.endsWith('/');
    const ext = util.extname(pathname);
    const basenameWithoutExt = util.basenameWithoutExt(pathname);
    const keyRaw1 = trimLeadingIllegalCharacters(basenameWithoutExt);

    const [, leadingSymbols = '', keyRaw] = keyRaw1.match(/(^[$_]+)?(.+)/);

    const keyRaw2 = config.commaReverse ? keyRaw.split(',').reverse().join(' ') : keyRaw;
    const keyCamel = camelCase(keyRaw2);
    const keyTransformed = util.startsWithUpper(keyRaw) ? util.upperFirst(keyCamel) : keyCamel;
    const keyRawOrTransformed = util.legalJsName(keyRaw) ? keyRaw : keyTransformed;
    const key = leadingSymbols + (configFinal.transformKeys ? keyRawOrTransformed : keyRaw);
    const fullySpecified = configFinal.fullySpecified || ext === '.json';
    const pathWithoutExt = fullySpecified ? pathname : basenameWithoutExt;
    const fullySpecifiedImportPath = isDir ? pathname + configFinal.filename : pathname;
    const importPath = fullySpecified ? fullySpecifiedImportPath : pathWithoutExt;
    return { key, importPath: `./${importPath}` };

};
