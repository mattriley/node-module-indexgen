module.exports = ({ self, strategies, config }) => dirData => {

    const files = self.getScriptFiles(dirData);
    const script = strategies[config.type]({ files });
    return script;

};
