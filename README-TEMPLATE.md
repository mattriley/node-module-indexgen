<%- lib.renderOpening() %>

## Install

<%- await lib.renderCode('npm install module-indexgen', '', 'https://www.npmjs.com/package/module-indexgen') %>

Not to be confused with `indexgen` which is similar but deprecated.

## Usage

```
npx indexgen <targetDir> [<targetDir>...] [options]
```

Options:

`--watch`: Regenerate on file changes.

`--watchDelayMilliseconds`: Delay before reacting to file changes. Default is `1000`.

`--type`: `cjs` or `esm`. Default is determined by `type` in `package.json`, otherwise `cjs`.

`--fullySpecified`: Maintain fully specified import paths as required by `esm`. Default is `false`.

`--only`: Glob pattern to limit included files. Default is `'*.{cjs,mjs,js,json,jsx}'`.

`--ignore`: Paths to ignore. Default is `node_modules`.

`--transformKeys`: Applies camel case (and others) to generated keys. Default is `true`.

`--commaReverse`: Reverses generated keys by comma, e.g. `bar, foo` becomes `fooBar`. Default is `true`.

## Example

Given the following directory structure:

```
proj/
    src/
        components/
            foo.js
            bar.js
```

Running `indexgen` from the `proj` directory produces:

```
proj/
    src/
        index.js
        components/
            bar.js
            foo.js
            foo-bar.js
            index.js
```

Contents of `proj/src/components/index.js`:

```js
module.exports = {
    bar: require('./bar'),
    foo: require('./foo'),    
    fooBar: require('./foo-bar')
}
```

Notice the key for `foo-bar` is camel cased to `fooBar`.

Contents of `proj/src/index.js`:

```js
module.exports = {
    components: require('./components')
}
```

`require('./src')` produces:

```
{
    components: {
        foo: (exported value for foo.js),
        bar: (exported value for bar.js),
        fooBar: (exported value for foo-bar.js)
    }
}
```

## Architecture

<%- await lib.renderModuleDiagram() %>
