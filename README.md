## clean-css-brunch
Adds [clean-css](https://github.com/GoalSmashers/clean-css) support to
[brunch](http://brunch.io).

The plugin will minify your CSS files.

## Usage
Install the plugin via npm with `npm install --save clean-css-brunch`.

Or, do manual install:

* Add `"clean-css-brunch": "x.y.z"` to `package.json` of your brunch app.
  Pick a plugin version that corresponds to your minor (y) brunch version.
* If you want to use git version of plugin, add
`"clean-css-brunch": "git+ssh://git@github.com:brunch/clean-css-brunch.git"`.

To specify clean-css options, use `config.plugins.cleancss` object, for example:

```
config:
  plugins:
    cleancss:
      keepSpecialComments: 0
      removeEmpty: true
```
