module.exports = {
    __modulename: 'codeGeneration',
    generateFiles: require('./generate-files'),
    generateScripts: require('./generate-scripts'),
    getFileData: require('./get-file-data'),
    getFileNameWithoutExt: require('./get-file-name-without-ext'),
    getModuleData: require('./get-module-data'),
    getScriptData: require('./get-script-data'),
    writeScripts: require('./write-scripts')
};
