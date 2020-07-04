module.exports = {
    __modulename: 'codeGeneration',
    generateFiles: require('./generate-files'),
    generateScripts: require('./generate-scripts'),
    getFileData: require('./get-file-data'),
    getModuleData: require('./get-module-data'),
    getScriptData: require('./get-script-data'),
    indexgen: require('./indexgen'),
    listDir: require('./list-dir'),
    watch: require('./watch'),
    writeScripts: require('./write-scripts')
};
