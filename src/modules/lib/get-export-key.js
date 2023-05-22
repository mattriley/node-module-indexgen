const camelCase = require('lodash.camelcase');

module.exports = ({ util }) => (pathname, config) => {

    const basenameMinusExtension = util.basenameWithoutExt(pathname);
    const [basenameMinusSort] = basenameMinusExtension.split(config.sortSeparator).reverse();
    const [, leadingSymbols = '', keyAlpha] = basenameMinusSort.match(/(^[$_]+)?(.+)/);
    const keyBare = keyAlpha.split(config.reverseDelimiter).reverse().join('-');

    if (!config.transformKeys) return keyBare;

    const keyCamel = camelCase(keyBare);
    const keyPascal = util.upperFirst(keyCamel);
    const keyCase = util.startsWithUpper(keyBare) ? keyPascal : keyCamel;
    const keyFinal = util.legalJsName(keyBare) ? keyBare : keyCase;
    return leadingSymbols + keyFinal;

};
