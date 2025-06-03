const camelCase = require('lodash.camelcase');
const path = require('path');

module.exports = ({ fsx, util }) => (pathname, config, dirData) => {

    const basenameMinusExtension = fsx.isFile(path.resolve(dirData.dirPath + '/' + pathname)) ? util.basenameWithoutExt(pathname) : path.basename(pathname);
    const [basenameMinusSort] = basenameMinusExtension.split(config.sortSeparator).reverse();
    const [, leadingSymbols = '', keyAlpha] = basenameMinusSort.match(/([^a-z]+)?(.+)/);
    const keyBare = keyAlpha.split(config.reverseDelimiter).reverse().join('-');

    const camel = keyBare.split('.').map(camelCase).join('.');
    const pascal = util.upperFirst(camel);
    const auto = util.legalJsName(keyBare) ? keyBare : util.startsWithUpper(keyBare) ? pascal : camel;
    const none = keyBare;
    const casing = { camel, pascal, auto, none };

    const keyCase = casing[config.case] ?? auto;

    if (config.keepLeadingSymbols) return leadingSymbols + keyCase;

    return keyCase;

};
