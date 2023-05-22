const camelCase = require('lodash.camelcase');

module.exports = ({ util }) => (pathname, config) => {

    const basenameMinusExtension = util.basenameWithoutExt(pathname);
    const [basenameMinusSort] = basenameMinusExtension.split(config.sortSeparator).reverse();
    const [, leadingSymbols = '', keyAlpha] = basenameMinusSort.match(/(^[$_]+)?(.+)/);
    const keyBare = keyAlpha.split(config.reverseDelimiter).reverse().join('-');
    const keyCamel = camelCase(keyBare);
    const keyPascal = util.upperFirst(keyCamel);
    const keyCase = util.startsWithUpper(keyBare) ? keyPascal : keyCamel;
    const keyTransformed = util.legalJsName(keyBare) ? keyBare : keyCase;
    return config.transformKeys ? leadingSymbols + keyTransformed : keyBare;

};
