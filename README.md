# indexgen

Generates `index.js` files for all directories matching a given glob pattern.

The generated code exports a plain object with an entry for each file and subdirectory found in the directory.

## Install

`npm i @mattriley/indexgen`

Not to be confused with the unscoped package `indexgen` which is similar but deprecated.

## Usage

`npx indexgen [GLOB_PATTERN]`

The glob pattern defaults to `src/**/` if not provided.

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
    __modulename: 'components',
    bar: require('./bar'),
    foo: require('./foo'),    
    fooBar: require('./foo-bar')
}
```

Notice the key for `foo-bar` is camel cased to `fooBar`.

Contents of `proj/src/index.js`:

```js
module.exports = {
    __modulename: 'src',
    components: require('./components')
}
```

`require('./src')` produces:

```
{
    __modulename: 'src',
    components: {
        __modulename: 'components',
        foo: (exported value for foo.js),
        bar: (exported value for bar.js),
        fooBar: (exported value for foo-bar.js)
    }
}
```

## Limitations

Only supports CommonJS with `.js` and `.cjs` files at this time.
