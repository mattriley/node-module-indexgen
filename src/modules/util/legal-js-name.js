const regex = RegExp(/^[a-zA-Z_$][0-9a-zA-Z_$]*$/);

module.exports = () => str => {
    return regex.test(str);
};
