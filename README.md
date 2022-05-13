# module-indexgen

Do a barrel roll! Generates barrel (index.js) files that rollup exports for each module in a directory and re-exports them as a single module.

![Do a barrel roll!](https://media.giphy.com/media/ZQMVKzoTLdNBu/giphy.gif)

[Star Fox 64 / Lylatwars](https://en.wikipedia.org/wiki/Star_Fox_64) released 1997 on Nintendo 64.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Install

```
npm i module-indexgen
```

Not to be confused with `indexgen` which is similar but deprecated.

## Usage

```
npx indexgen <targetDir> [<targetDir>...] [options]
```

Options:

`--type`: `cjs` or `esm`. Default is determined by `type` in `package.json`.

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

## Architecture

```mermaid
graph TD;
    commands-->services;
    commands-->io;
    commands-->config;
    futil-->io;
    services-->config;
    services-->io;
    services-->futil;
    services-->util;
    services-->strategies;
```
