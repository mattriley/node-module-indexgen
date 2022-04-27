# module-indexgen

Generates barrel (index.js) files that rollup exports for each module in a directory and re-exports them as a single module.

![Do a barrel roll!](https://media.giphy.com/media/ZQMVKzoTLdNBu/giphy.gif)

## Install

`npm i module-indexgen`

Not to be confused with the unscoped package `indexgen` which is similar but deprecated.

## Usage

`npx indexgen [target dir] [options]`

Options:

`--type=[module system type]`: `cjs` or `esm`. Default is `cjs`.

`--watch`: Regenerate on file changes.

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
