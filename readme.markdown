# confuse

Merge command-line arguments and config files deeply and recursively up a
directory hierarchy with a preference for the most local config file.

# example

In this `example/` directory there are some nested config files and scripts.

The scripts all look something like:

``` js
var config = require('confuse')();
console.dir(config);
```

When `example/w.js` is run, the example/config.json

``` json
{ "W" : 777, "q" : { "w" : 7 }, "n" : 3 }
```

is loaded, rendering this output:

```
$ node example/w.js
{ W: 777, q: { w: 7 }, n: 3 }
```

It's the same.

But there is an example/foo/config.json:

``` json
{ "Z" : 666, "q" : { "z" : 6 }, "n" : 2 }
```

Now both `example/config.json` and `example/foo/config.json` are merged
together, generating the result for example/foo/z.js of:

```
$ node example/foo/z.js
{ W: 777, q: { w: 7, z: 6 }, n: 2, Z: 666 }
```

There are more configuration files in deeper directories which get merged
together the further into the hierarchy we go. Here's the complete sequence:

```
$ node example/w.js 
{ W: 777, q: { w: 7 }, n: 3 }
```

```
$ node example/foo/z.js 
{ W: 777, q: { w: 7, z: 6 }, n: 2, Z: 666 }
```

```
$ node example/foo/bar/y.js 
{ W: 777, q: { w: 7, z: 6, y: 5 }, n: 1, Z: 666, Y: 555 }
```

```
$ node example/foo/bar/baz/x.js 
{ W: 777,
  q: { w: 7, z: 6, y: 5, x: 4 },
  n: 0,
  Z: 666,
  Y: 555,
  X: 444 }
```

# methods

``` js
var confuse = require('confuse')
```

## confuse(opts)

Return a config object given the optional options `opts`.

If `opts.files` is specified, use this array of config files names in preference
order. By default, `opts.files` is just `[ 'config.json' ]`.

If `opts.env` is given, unshift `'config.' + opts.env + '.json'` to the
beginning of `opts.files`. `opts.env` can also be an array of environment
strings to modify `opts.files` with.

When you pass in an `opts.prefix`, confuse will use this string instead of
`'config'` to make config filenames.

If you set a an `opts.dir`, the config file search will start at this directory
instead of `path.dirname(require.main.filename)`.

Use `opts.argv` as an initial value if specified,
otherwise use [optimist](https://github.com/substack/node-optimist).argv.

# install

With [npm](http://npmjs.org) do:

```
npm install confuse
```

# license

MIT
