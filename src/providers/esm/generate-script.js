module.exports = () => moduleData => {
    const { files } = moduleData;
    const imports = Object.entries(files).map(([key, path]) => `export ${key} from '${path}';`);
    const exports = `export default { ${Object.keys(files)} };`
    return `${imports.join('\n')}\n${exports}\n`;
};
