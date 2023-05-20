const regex = RegExp(/^[a-zA-Z_$][0-9a-zA-Z_$]*$/);

module.exports = () => str => regex.test(str);
