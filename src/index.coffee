cleanCSS = require 'clean-css'
sysPath = require 'path'

module.exports = class CleanCSSMinifier
  brunchPlugin: yes
  type: 'stylesheet'

  constructor: (@config) ->
    @options = @config?.plugins?.cleancss ? {}

  minify: (data, path, callback) =>
    try
      minified = cleanCSS.process data, @options
    catch err
      error = "CSS minify failed on #{path}: #{error}"
    process.nextTick ->
      callback error, (minified or data)
